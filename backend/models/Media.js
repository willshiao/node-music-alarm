'use strict';

const Sequelize = require('sequelize');
const db = require('../lib/db');

const Media = db.define('media', {
  id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  name: Sequelize.STRING,
  path: Sequelize.STRING,
  duration: { type: Sequelize.INTEGER.UNSIGNED, defaultValue: 0 },
  tags: { type: Sequelize.JSON, defaultValue: [] },
  // Number of times a song has been played
  numPlays: { type: Sequelize.INTEGER.UNSIGNED, defaultValue: 0 },
  // Number of times a song has been guessed correctly
  numCorrect: { type: Sequelize.INTEGER.UNSIGNED, defaultValue: 0 },
  // Number of times a song has been guess incorrectly, not necessarily numPlays - numCorrect
  numIncorrect: { type: Sequelize.INTEGER.UNSIGNED, defaultValue: 0 },
});

module.exports = Media;
