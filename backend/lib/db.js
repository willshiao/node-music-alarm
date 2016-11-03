'use strict';

const fs = require('fs');
const db = require('sqlite');
const config = require('config');

db.createTables = function() {
  return db.run(fs.readFileSync(config.get('db.schema')));
};

module.exports = db;
