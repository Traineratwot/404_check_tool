-- --------------------------------------------------------
-- Версия сервера:               10.3.13-MariaDB-log - mariadb.org binary distribution
-- HeidiSQL Версия:              10.2.0.5599
-- --------------------------------------------------------
-- Дамп структуры для таблица urls_test
CREATE TABLE IF NOT EXISTS `urls_test` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`url` varchar(256) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
	`parent` varchar(256) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
	`path` text COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
	`code` int(3) NOT NULL DEFAULT 0,
	PRIMARY KEY (`id`),
	UNIQUE KEY `url` (`url`, `parent`)
) ENGINE = InnoDB AUTO_INCREMENT = 1007 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;