'use strict';

const db = require('./db');
const Media = require('../models/Media');

class MediaHelper {
  static getRandom() {
    return db.query(`SELECT * FROM media WHERE id IN (
      SELECT id FROM media ORDER BY RANDOM() LIMIT 1)`, { model: Media });
  }
}

module.exports = MediaHelper;
