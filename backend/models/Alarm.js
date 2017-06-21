'use strict';

const Sequelize = require('sequelize');
const db = require('../lib/db');

const Alarm = db.define('alarm', {
  id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  rule: Sequelize.STRING,
  name: Sequelize.STRING,
  enabled: { type: Sequelize.BOOLEAN, defaultValue: true },
  numPlays: { type: Sequelize.INTEGER.UNSIGNED, defaultValue: 0 },
});

module.exports = Alarm;
