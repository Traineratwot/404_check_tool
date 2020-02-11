<?php
$mss = json_decode($_POST['mss'], true);
$data = [];
foreach ($mss as $key => $value) {
	foreach ($value as $k => $val) {
		$data[] = ['parent' => $key, 'url' => $val[0], 'path' => $val[1]];
	}
}
$dsn = 'mysql:dbname=YOUR_DB_NAME;host=127.0.0.1';
$db = new PDO($dsn, 'root', '');
$stmt = $db->prepare('INSERT INTO `urls_test` (`parent`, `url`, `path`) VALUES (:parent, :url, :path)');
$stmt->bindParam(1, $parent);
$stmt->bindParam(2, $url);
$stmt->bindParam(3, $path);

foreach ($data as $vals) {
	$parent = $vals['parent'];
	$url = $vals['url'];
	$path = $vals['path'];
	$stmt->execute([':parent' => $parent, ':url' => $url, ':path' => $path]);
}
// file_put_contents('test.json', json_encode($data));
