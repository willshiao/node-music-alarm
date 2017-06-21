'use strict';

const config = require('config');
const Sequelize = require('sequelize');

const db = new Sequelize(config.get('db.path'));

module.exports = db;
