'use strict';

const config = require('config');
const Sequelize = require('sequelize');
const logger = require('./logger');

const db = new Sequelize('main', null, null, {
  dialect: 'sqlite',
  logging: logger.silly,
  storage: config.get('db.path'),
});

module.exports = db;
