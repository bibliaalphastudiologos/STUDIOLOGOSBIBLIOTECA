<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=utf-8");
header("Cache-Control: public, max-age=300");

$url = $_GET['url'] ?? '';
if (!$url) { echo json_encode(['error' => 'no url']); exit; }

$allowed = [
    'g1.globo.com','admin.cnnbrasil.com.br','feeds.folha.uol.com.br',
    'rss.uol.com.br','jovempan.com.br','veja.abril.com.br',
    'www.poder360.com.br','feeds.bbci.co.uk','www12.senado.leg.br',
    'agenciabrasil.ebc.com.br','rss.cnn.com',
];
$host = parse_url($url, PHP_URL_HOST);
$ok = false;
foreach ($allowed as $d) { if ($host === $d || str_ends_with($host, '.'.$d)) { $ok = true; break; } }
if (!$ok) { echo json_encode(['error' => 'domain not allowed']); exit; }

$cacheDir = sys_get_temp_dir() . '/rss_cache/';
if (!is_dir($cacheDir)) @mkdir($cacheDir, 0777, true);
$cacheFile = $cacheDir . md5($url) . '.json';
if (file_exists($cacheFile) && (time() - filemtime($cacheFile)) < 300) {
    echo file_get_contents($cacheFile); exit;
}

$ctx = stream_context_create(['http' => [
    'timeout' => 8, 'follow_location' => 1,
    'user_agent' => 'Mozilla/5.0 (compatible; StudioLogos/1.0)',
], 'ssl' => ['verify_peer' => false, 'verify_peer_name' => false]]);
$xml = @file_get_contents($url, false, $ctx);
if ($xml === false) { echo json_encode(['error' => 'fetch failed']); exit; }

libxml_use_internal_errors(true);
$doc = @simplexml_load_string($xml, 'SimpleXMLElement', LIBXML_NOCDATA);
if (!$doc) { echo json_encode(['error' => 'xml parse failed']); exit; }

$items = [];
foreach ($doc->channel->item as $item) {
    $title = trim((string)$item->title);
    $link  = trim((string)$item->link) ?: trim((string)$item->guid);
    if ($title && strlen($title) > 4) {
        $items[] = ['title' => $title, 'link' => $link];
        if (count($items) >= 8) break;
    }
}
$out = json_encode(['items' => $items, 'ts' => time()]);
@file_put_contents($cacheFile, $out);
echo $out;
