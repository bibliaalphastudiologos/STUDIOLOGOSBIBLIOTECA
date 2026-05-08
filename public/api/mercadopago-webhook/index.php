<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

const MP_API = 'https://api.mercadopago.com';

function fail(int $status, string $message): void {
    http_response_code($status);
    echo json_encode(['error' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

function env_required(string $name): string {
    $value = getenv($name);
    if (!$value) {
        fail(500, "Missing environment variable: {$name}");
    }
    return $value;
}

function normalize_email(?string $email): string {
    return strtolower(trim((string) $email));
}

function brasilia_date(): string {
    $date = new DateTimeImmutable('now', new DateTimeZone('America/Sao_Paulo'));
    return $date->format('d/m/Y');
}

function json_request(string $method, string $url, array $headers = [], ?array $payload = null): array {
    $ch = curl_init($url);
    $baseHeaders = ['Accept: application/json'];
    if ($payload !== null) {
        $baseHeaders[] = 'Content-Type: application/json';
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload, JSON_UNESCAPED_UNICODE));
    }
    curl_setopt_array($ch, [
        CURLOPT_CUSTOMREQUEST => $method,
        CURLOPT_HTTPHEADER => array_merge($baseHeaders, $headers),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 30,
    ]);
    $response = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($response === false || $status < 200 || $status >= 300) {
        throw new RuntimeException("HTTP {$status} {$url} {$error} {$response}");
    }

    $decoded = json_decode((string) $response, true);
    return is_array($decoded) ? $decoded : [];
}

function get_data_id(array $query, array $body): string {
    if (!empty($query['data.id'])) return (string) $query['data.id'];
    if (!empty($query['id'])) return (string) $query['id'];
    if (!empty($body['data']['id'])) return (string) $body['data']['id'];
    if (!empty($body['id'])) return (string) $body['id'];
    if (!empty($body['resource'])) {
        $parts = explode('/', (string) $body['resource']);
        return (string) end($parts);
    }
    return '';
}

function validate_signature(array $query, array $body): bool {
    $secret = getenv('MERCADO_PAGO_WEBHOOK_SECRET');
    if (!$secret) return true;

    $signature = $_SERVER['HTTP_X_SIGNATURE'] ?? '';
    $requestId = $_SERVER['HTTP_X_REQUEST_ID'] ?? '';
    $dataId = get_data_id($query, $body);
    if (!$signature || !$requestId || !$dataId) return false;

    $parts = [];
    foreach (explode(',', $signature) as $part) {
        [$key, $value] = array_pad(explode('=', $part, 2), 2, '');
        if ($key && $value) $parts[trim($key)] = trim($value);
    }

    $manifest = "id:{$dataId};request-id:{$requestId};ts:" . ($parts['ts'] ?? '') . ';';
    $expected = hash_hmac('sha256', $manifest, $secret);
    return hash_equals($expected, $parts['v1'] ?? '');
}

function mp_get(string $path): array {
    return json_request('GET', MP_API . $path, [
        'Authorization: Bearer ' . env_required('MERCADO_PAGO_ACCESS_TOKEN'),
    ]);
}

function payment_status(?string $status): string {
    if ($status === 'approved' || $status === 'authorized') return 'approved';
    if ($status === 'rejected') return 'rejected';
    if ($status === 'cancelled' || $status === 'canceled') return 'cancelled';
    return 'pending';
}

function load_payment_payload(array $query, array $body): array {
    $type = (string) ($query['type'] ?? $query['topic'] ?? $body['type'] ?? $body['topic'] ?? '');
    if (!$type && !empty($body['action'])) {
        $type = explode('.', (string) $body['action'])[0] ?? '';
    }

    $id = get_data_id($query, $body);
    if (!$id) {
        throw new RuntimeException('Webhook sem ID de pagamento/preapproval.');
    }

    if (strpos($type, 'preapproval') !== false) {
        $preapproval = mp_get('/preapproval/' . rawurlencode($id));
        $email = normalize_email($preapproval['payer_email'] ?? ($preapproval['payer']['email'] ?? ''));
        return [
            'paymentId' => (string) $preapproval['id'],
            'email' => $email,
            'nome' => $preapproval['payer_first_name'] ?? $preapproval['reason'] ?? 'Assinante Studio Logos',
            'payment_status' => payment_status($preapproval['status'] ?? null),
            'rawStatus' => $preapproval['status'] ?? 'unknown',
            'raw' => $preapproval,
        ];
    }

    $payment = mp_get('/v1/payments/' . rawurlencode($id));
    $email = normalize_email($payment['payer']['email'] ?? ($payment['metadata']['email'] ?? ($payment['additional_info']['payer']['email'] ?? '')));
    return [
        'paymentId' => (string) $payment['id'],
        'email' => $email,
        'nome' => $payment['payer']['first_name'] ?? $payment['payer']['nickname'] ?? ($payment['card']['cardholder']['name'] ?? 'Assinante Studio Logos'),
        'payment_status' => payment_status($payment['status'] ?? null),
        'rawStatus' => $payment['status'] ?? 'unknown',
        'raw' => $payment,
    ];
}

function firebase_access_token(array $serviceAccount): string {
    $now = time();
    $header = ['alg' => 'RS256', 'typ' => 'JWT'];
    $claim = [
        'iss' => $serviceAccount['client_email'],
        'scope' => 'https://www.googleapis.com/auth/datastore',
        'aud' => 'https://oauth2.googleapis.com/token',
        'iat' => $now,
        'exp' => $now + 3600,
    ];

    $encode = static fn(array $data): string => rtrim(strtr(base64_encode(json_encode($data)), '+/', '-_'), '=');
    $unsigned = $encode($header) . '.' . $encode($claim);
    openssl_sign($unsigned, $signature, $serviceAccount['private_key'], OPENSSL_ALGO_SHA256);
    $jwt = $unsigned . '.' . rtrim(strtr(base64_encode($signature), '+/', '-_'), '=');

    $token = json_request('POST', 'https://oauth2.googleapis.com/token', [], [
        'grant_type' => 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        'assertion' => $jwt,
    ]);
    return (string) $token['access_token'];
}

function fs_value($value): array {
    if ($value === null) return ['nullValue' => null];
    if (is_bool($value)) return ['booleanValue' => $value];
    if (is_int($value)) return ['integerValue' => (string) $value];
    if (is_float($value)) return ['doubleValue' => $value];
    if (is_array($value)) return ['stringValue' => json_encode($value, JSON_UNESCAPED_UNICODE)];
    return ['stringValue' => (string) $value];
}

function fs_fields(array $record): array {
    $fields = [];
    foreach ($record as $key => $value) {
        $fields[$key] = fs_value($value);
    }
    return ['fields' => $fields];
}

function firestore_base(array $serviceAccount): string {
    $database = getenv('FIRESTORE_DATABASE_ID') ?: '(default)';
    return 'https://firestore.googleapis.com/v1/projects/' . rawurlencode($serviceAccount['project_id']) .
        '/databases/' . rawurlencode($database) . '/documents';
}

function firestore_patch(string $token, string $url, array $record): void {
    json_request('PATCH', $url, ['Authorization: Bearer ' . $token], fs_fields($record));
}

function firestore_query_user_docs(string $token, string $base, string $email): array {
    $payload = [
        'structuredQuery' => [
            'from' => [['collectionId' => 'users']],
            'where' => [
                'fieldFilter' => [
                    'field' => ['fieldPath' => 'email'],
                    'op' => 'EQUAL',
                    'value' => ['stringValue' => $email],
                ],
            ],
        ],
    ];

    $rows = json_request('POST', $base . ':runQuery', ['Authorization: Bearer ' . $token], $payload);
    $docs = [];
    foreach ($rows as $row) {
        if (!empty($row['document']['name'])) $docs[] = $row['document']['name'];
    }
    return $docs;
}

function upsert_access(array $payment): void {
    if (!$payment['email']) {
        throw new RuntimeException('Pagamento sem e-mail do pagador.');
    }

    $serviceAccount = json_decode(env_required('FIREBASE_SERVICE_ACCOUNT_JSON'), true);
    if (!is_array($serviceAccount)) {
        throw new RuntimeException('FIREBASE_SERVICE_ACCOUNT_JSON invalido.');
    }

    $token = firebase_access_token($serviceAccount);
    $base = firestore_base($serviceAccount);
    $approved = $payment['payment_status'] === 'approved';
    $record = [
        'nome' => $payment['nome'],
        'email' => $payment['email'],
        'payment_status' => $payment['payment_status'],
        'access_status' => $approved ? 'active' : 'blocked',
        'paymentId' => $payment['paymentId'],
        'rawStatus' => $payment['rawStatus'],
        'planPrice' => 'R$ 19,00',
        'planPeriod' => 'mensal',
        'updatedAtIso' => gmdate('c'),
    ];

    if ($approved) {
        $record['approvedAtIso'] = gmdate('c');
        $record['approvalDateBrasilia'] = brasilia_date();
    }

    firestore_patch($token, $base . '/payments/' . rawurlencode($payment['paymentId']), $record + [
        'raw' => $payment['raw'],
        'receivedAtIso' => gmdate('c'),
    ]);
    firestore_patch($token, $base . '/payment_access/' . rawurlencode($payment['email']), $record);

    foreach (firestore_query_user_docs($token, $base, $payment['email']) as $docUrl) {
        firestore_patch($token, $docUrl, $record + [
            'status' => $approved ? 'approved' : 'blocked',
        ]);
    }
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    fail(405, 'Method not allowed');
}

try {
    $body = json_decode(file_get_contents('php://input') ?: '{}', true);
    if (!is_array($body)) $body = [];

    if (!validate_signature($_GET, $body)) {
        fail(401, 'Invalid Mercado Pago signature');
    }

    $payment = load_payment_payload($_GET, $body);
    upsert_access($payment);

    echo json_encode(['ok' => true, 'payment_status' => $payment['payment_status']], JSON_UNESCAPED_UNICODE);
} catch (Throwable $error) {
    error_log('[Studio Logos Mercado Pago webhook] ' . $error->getMessage());
    fail(500, 'Webhook processing failed');
}
