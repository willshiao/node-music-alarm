'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const db = require('sqlite');
const config = require('config');

db.createTables = function createTables() {
  return fs.readFileAsync(config.get('db.schema'), 'utf8')
    .then(data => db.exec(data));
};

module.exports = db;
