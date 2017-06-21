'use strict';

const Promise = require('bluebird');
const db = require('./db');
const Media = require('../models/Media');

class MediaHelper {
  static getRandom() {
    return MediaHelper.getRandomLimit(1)
      .then(items => Promise.resolve(items[0]));
  }

  static getRandomLimit(max) {
    if(isNaN(parseInt(max, 10))) {
      logger.warn('Invalid limit for getRandomLimit');
      return null;
    }

    return db.query(`SELECT * FROM media WHERE id IN (SELECT id FROM media ORDER BY RANDOM() LIMIT ${max})`, { model: Media });
  }
}

module.exports = MediaHelper;
