/*
SQLite Data Transfer

Source Server         : music-alarm
Source Server Version : 30714
Source Host           : :0

Target Server Type    : SQLite
Target Server Version : 30714
File Encoding         : 65001

Date: 2016-11-03 14:51:58
*/

PRAGMA foreign_keys = OFF;

-- ----------------------------
-- Table structure for alarms
-- ----------------------------
DROP TABLE IF EXISTS "main"."alarms";
CREATE TABLE "alarms" (
"id"  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
"rule"  TEXT,
"name"  TEXT,
"enabled"  INTEGER NOT NULL DEFAULT 1
);

-- ----------------------------
-- Table structure for media
-- ----------------------------
DROP TABLE IF EXISTS "main"."media";
CREATE TABLE "media" (
"id"  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
"name"  TEXT NOT NULL,
"path"  TEXT NOT NULL
);
