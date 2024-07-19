/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50726
Source Host           : localhost:3306
Source Database       : auth_db

Target Server Type    : MYSQL
Target Server Version : 50726
File Encoding         : 65001

Date: 2024-07-18 17:55:19
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `update_at` datetime DEFAULT NULL,
  `close_at` datetime DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `status` int(2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'test', '$2y$10$kjYsXKGZWhgZKx8uqKMtT.i2yDFGhBAWOrJ3HoO5chZUkvf76Kyw2', 'test@gmail.com', 'Ei72jjQMotHHgNDHO7sW3UNTlOqvPNyoTUBl8pFGUpAi4L9APuv4Kzdrws45RAwQpbvoJzm5OLz6ZKKL', '2024-07-18 10:47:57', null, null, null, '1');
