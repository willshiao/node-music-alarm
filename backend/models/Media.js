'use strict';

const path = require('path');
const Promise = require('bluebird');
const db = require('../lib/db');

class Media {
  constructor(data) {
    if(data.id) this.id = data.id;
    this.name = data.name;
    this.path = filterPath(data.path);
  }

  save() {
    return db.run('INSERT INTO `media` (name, path) VALUES (?, ?)', [
      this.name, this.path
    ]);
  }

  static getById(id) {
    return db.get('SELECT * FROM `media` WHERE id=?', id)
      .then(m => Promise.resolve(new Media(m)));
  }

  static getRandom() {
    return db.get('SELECT * FROM `media` ORDER BY RANDOM() LIMIT 1')
      .then(m => Promise.resolve(new Media(m)));
    //bad performance on large tables, but shouldn't be a problem
    //  since the app will probably have relatively few rows
  }

  static getAll() {
    return db.all('SELECT * FROM `media`')
      .then(items => {
        return Promise.resolve(items
          .map(a => new Media(a))
        );
      });
  }

  static deleteAll() {
    return db.run('DELETE FROM `media`');
  }
}

function filterPath(pathStr) { //Prevent directory tranversals
  return path.normalize(pathStr).replace(/^(\.\.[\/\\])+/, '');
}

module.exports = Media;
