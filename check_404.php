<?php

/**
 * Created by Andrey Stepanenko.
 * User: webnitros
 * Date: 11.02.2020
 * Time: 12:24
 */
$dsn = 'mysql:dbname=YOUR_DB_NAME;host=127.0.0.1';
$db = new PDO($dsn, 'root', '');
$table = $db->query("SELECT DISTINCT url from urls_test");
while ($row = $table->fetch(PDO::FETCH_ASSOC)) {
	$url = $row['url'];
	$code = 200;
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_HEADER, true);
	curl_setopt($ch, CURLOPT_NOBODY, true);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
	curl_setopt($ch, CURLOPT_MAXREDIRS, 2); // разрешаем только 10 редиректов за раз во избежание бесконечного цикла
	$data = curl_exec($ch);
	$code = curl_getinfo($ch, CURLINFO_HTTP_CODE); // Получаем HTTP-код
	curl_close($ch);
	$db->query("update urls_test set code = $code where url = '$url'");
}
