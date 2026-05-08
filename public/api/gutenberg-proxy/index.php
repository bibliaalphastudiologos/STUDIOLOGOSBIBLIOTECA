<?php
declare(strict_types=1);

header('Content-Type: text/plain; charset=utf-8');
header('Cache-Control: public, max-age=86400, stale-while-revalidate=604800');
header('Access-Control-Allow-Origin: https://studiologos.com.br');

const MAX_BYTES = 12000000;

function fail(int $status, string $message): void {
    http_response_code($status);
    echo $message;
    exit;
}

function valid_id(string $id): bool {
    return preg_match('/^\d{1,7}$/', $id) === 1;
}

function allowed_gutenberg_url(string $url, string $id): bool {
    $parts = parse_url($url);
    if (!$parts || ($parts['scheme'] ?? '') !== 'https') return false;
    if (($parts['host'] ?? '') !== 'www.gutenberg.org') return false;

    $path = $parts['path'] ?? '';
    $patterns = [
        "#^/cache/epub/{$id}/pg{$id}(-0)?\\.txt$#",
        "#^/cache/epub/{$id}/{$id}(-0)?\\.txt$#",
        "#^/files/{$id}/{$id}(-0)?\\.txt$#",
    ];

    foreach ($patterns as $pattern) {
        if (preg_match($pattern, $path) === 1) return true;
    }

    return false;
}

function candidate_urls(string $id, ?string $preferred): array {
    $urls = [];
    if ($preferred && allowed_gutenberg_url($preferred, $id)) {
        $urls[] = $preferred;
    }

    $urls = array_merge($urls, [
        "https://www.gutenberg.org/cache/epub/{$id}/pg{$id}.txt",
        "https://www.gutenberg.org/cache/epub/{$id}/pg{$id}-0.txt",
        "https://www.gutenberg.org/cache/epub/{$id}/{$id}-0.txt",
        "https://www.gutenberg.org/cache/epub/{$id}/{$id}.txt",
        "https://www.gutenberg.org/files/{$id}/{$id}-0.txt",
        "https://www.gutenberg.org/files/{$id}/{$id}.txt",
    ]);

    return array_values(array_unique($urls));
}

function fetch_text(string $url): ?string {
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_MAXREDIRS => 3,
        CURLOPT_CONNECTTIMEOUT => 8,
        CURLOPT_TIMEOUT => 25,
        CURLOPT_USERAGENT => 'StudioLogosReader/1.0 (+https://studiologos.com.br)',
        CURLOPT_HTTPHEADER => ['Accept: text/plain,*/*;q=0.8'],
    ]);

    $body = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $contentType = (string) curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
    curl_close($ch);

    if ($body === false || $status < 200 || $status >= 300) return null;
    if (strlen((string) $body) > MAX_BYTES) return null;
    if ($contentType && stripos($contentType, 'text') === false && stripos($contentType, 'octet-stream') === false) return null;

    $text = (string) $body;
    if (strlen(trim($text)) < 2500) return null;

    return $text;
}

$id = trim((string) ($_GET['id'] ?? ''));
if (!valid_id($id)) {
    fail(400, 'Invalid Gutenberg ID.');
}

$preferred = trim((string) ($_GET['url'] ?? ''));
foreach (candidate_urls($id, $preferred ?: null) as $url) {
    $text = fetch_text($url);
    if ($text !== null) {
        echo $text;
        exit;
    }
}

fail(404, 'Gutenberg text not found.');
