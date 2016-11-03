'use strict';

const db = require('sqlite');

db.addMedia = function(data) {
  return db.run('INSERT INTO `media` (name, path) VALUES (?, ?)', [
    data.name, data.path
  ]);
};

db.getAllMedia = function() {
  return db.all('SELECT * FROM `media`');
};

db.getMediabyId = function(id) {
  return db.get('SELECT * FROM `media` WHERE id=?', id);
};

module.exports = db;
