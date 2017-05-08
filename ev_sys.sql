/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50535
Source Host           : localhost:3306
Source Database       : ev_sys

Target Server Type    : MYSQL
Target Server Version : 50535
File Encoding         : 65001

Date: 2017-02-23 10:47:35
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `invoices`
-- ----------------------------
DROP TABLE IF EXISTS `invoices`;
CREATE TABLE `invoices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `invoice_money` float(10,0) DEFAULT NULL COMMENT '发票金额',
  `invoice_sure` int(10) DEFAULT '0' COMMENT '发票是否确认 1： 确认 、0：未确认',
  `invoice_remarks` varchar(500) DEFAULT NULL COMMENT '发票备注',
  `update_time` datetime DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of invoices
-- ----------------------------
INSERT INTO `invoices` VALUES ('13', '7', '400', '1', '4张100发票，农家乐饭庄', null, '2017-02-17 14:08:00');
INSERT INTO `invoices` VALUES ('14', '3', '600', '0', '测试机', null, '2017-02-22 16:57:00');

-- ----------------------------
-- Table structure for `summarize`
-- ----------------------------
DROP TABLE IF EXISTS `summarize`;
CREATE TABLE `summarize` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `self_average` float(10,0) DEFAULT NULL COMMENT '员工自身评分平均值',
  `other_average` float(10,0) DEFAULT NULL COMMENT '员工他人评分平均值',
  `synthesis_score` float(10,0) DEFAULT NULL COMMENT '总分数',
  `invoice_money` float(10,0) DEFAULT NULL COMMENT '员工收入金额',
  `income_money` float(10,0) DEFAULT NULL COMMENT '员工支出金额',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of summarize
-- ----------------------------

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(80) DEFAULT NULL COMMENT '（废弃）',
  `uname` varchar(11) DEFAULT NULL,
  `passwd` varchar(100) DEFAULT NULL,
  `reality_name` varchar(10) DEFAULT NULL COMMENT '真实姓名',
  `avatar` varchar(300) DEFAULT NULL,
  `is_admin` int(11) unsigned zerofill NOT NULL DEFAULT '00000000000' COMMENT '是否为管理员  1：管理员、0非管理员',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('3', null, 'sipeng', '$2a$10$CZCk0e41CbeH4SPABdWQVuzOjDRKdzDLJ/CSBUKyk9QXqPLSVRSZG', '思鹏', null, '00000000001');
INSERT INTO `users` VALUES ('4', null, 'chancy', '$2a$10$2ZsLIzOYXVYNCtIj5hellezgSGpJJ0cqs9GZJsIK721wdYXHBvWgm', 'chancy', null, '00000000000');
INSERT INTO `users` VALUES ('5', null, 'jony', '$2a$10$eR2rGMsHrhrAnmaruo1E4OzCb8y4L.6JiLb/6yZAWRdy53OAP3GpS', 'jony', null, '00000000000');
INSERT INTO `users` VALUES ('6', null, 'zhangqun', '$2a$10$CsibMf4ZYRqLgZbBbG.7ruYymMRS2UlUNMkyusn8z41w5nqwfY.OK', '张群', null, '00000000000');
INSERT INTO `users` VALUES ('7', null, 'shengxin', '$2a$10$h4Hfjvn7q3fvQxrANJO99OnzP832NnMKu2UiNRSM47WGUe2bOHOj6', '圣新', null, '00000000000');
INSERT INTO `users` VALUES ('8', null, 'wanglu', '$2a$10$7yQO0MxEB4TsJ339xjmUAeClvmVJYZzzEm8HLE3qHw3RSAiwEchKG', '王璐', null, '00000000000');
INSERT INTO `users` VALUES ('9', null, 'quanjixing', '$2a$10$1/ixuBwQkM0JcmIcg/fA3.5nxk.gEWiVtarO6bgaKOWOOpapEW6FS', '权吉星', null, '00000000000');
INSERT INTO `users` VALUES ('10', null, 'chenyuzhu', '$2a$10$hzny16yaE7ffsnzcCiUMR.qpHLiPyM3DWKmEYrY/FTrdg2fL8PLES', '陈玉柱', null, '00000000000');
INSERT INTO `users` VALUES ('11', null, 'lisi', '$2a$10$v7OG.eUQr2vLursmUI4qLOzpAuZk9damu.jjRFoViTryz34t0.TRa', '李斯', null, '00000000000');
INSERT INTO `users` VALUES ('12', null, 'liying', '$2a$10$pR/34tp8lv8.jhw4Uy.a/eSUA9fzB1cl2K7SH/GzvO3BdX6ob/vrG', '李颖', null, '00000000000');
INSERT INTO `users` VALUES ('13', null, 'liuhengyao', '$2a$10$WhbcBtOY5fHCGnylZ1j9euh9o.Z3cODE7uf5dchk4zeub1IsPu5/e', '刘恒尧', null, '00000000000');
INSERT INTO `users` VALUES ('14', null, 'matianyi', '$2a$10$PivBFOPjC14VGtLE/6UYAelPoKVUyVkHckG2Of7UXeGFCjltHEOBW', '马添翼', null, '00000000000');
INSERT INTO `users` VALUES ('15', null, 'wangqiao', '$2a$10$jQ4Aqhg9O43vbMCvx/atzO5aaQxeSm6i8kCI5oJHkJlslf8xvYwbK', '王乔', null, '00000000000');
INSERT INTO `users` VALUES ('16', null, 'yuqi', '$2a$10$Y.M9zLeAcFeYDTPaflg/Oe3Fqydhg6prdBFz1fJT2IF1CKozhJMBG', '余奇', null, '00000000000');
INSERT INTO `users` VALUES ('17', null, 'zhangwanqi', '$2a$10$/JAdMnhrU.8bQ7Kub.rIK.hPbDTm7K4wce07grvtX5bTT0ObviCt6', '张旺祺', null, '00000000000');
INSERT INTO `users` VALUES ('18', null, 'ligang', '$2a$10$dOLUaHuuepD7r4/NR4xPdeIyGzZrD0f.TZzfr5xDkMoRGrDRkXs0W', '李刚', null, '00000000000');
INSERT INTO `users` VALUES ('19', null, 'wangrihong', '$2a$10$RUZdUwgjHvBJsRyAiX8GleCgLaSZSheGhYmqQ/5Ov5HcJ8NY5VJ1e', '王日宏', null, '00000000000');
INSERT INTO `users` VALUES ('20', null, 'zhujingjing', '$2a$10$.Fl/TEZJEYpC9ZgURzcut.gfi5KM4ym7XVbIXwW2HMLjklEAfk1FG', '朱敬敬', null, '00000000000');

-- ----------------------------
-- Table structure for `work_summary`
-- ----------------------------
DROP TABLE IF EXISTS `work_summary`;
CREATE TABLE `work_summary` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned zerofill NOT NULL,
  `start_worktime` datetime DEFAULT NULL COMMENT '工作时间段',
  `end_worktime` datetime DEFAULT NULL COMMENT '工作时长',
  `overtime` float(5,1) DEFAULT NULL COMMENT '加班时间',
  `work_content` varchar(300) DEFAULT NULL COMMENT '工作内容',
  `self_score` float(5,0) DEFAULT NULL COMMENT '自身评分',
  `create_time` datetime DEFAULT NULL,
  `update_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `average_score` float(10,0) DEFAULT NULL COMMENT '当天平均分',
  `zan_num` int(10) unsigned zerofill DEFAULT '0000000000',
  `work_state` int(1) unsigned zerofill DEFAULT '0' COMMENT '工作状态  0 ：工作中 1：已完成',
  `is_score` varchar(300) DEFAULT '[]' COMMENT '已经评分的工作总结ID',
  `cai_num` int(10) unsigned zerofill DEFAULT '0000000000',
  `work_time` float(5,1) DEFAULT '0.0' COMMENT '工作时长',
  PRIMARY KEY (`id`),
  KEY `uid` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of work_summary
-- ----------------------------
INSERT INTO `work_summary` VALUES ('51', '0000000003', '2017-02-23 10:43:55', '2017-02-23 10:44:31', null, '浏阳河-跑得快 游戏回放.\r\n            START[--{[ - ]}--]游戏回放--结束\r\nEND', '8', '2017-02-23 10:43:55', '2017-02-23 10:45:57', null, '0000000001', '1', '[{\"uid\":5,\"wId\":\"51\"}]', '0000000000', '0.0');
