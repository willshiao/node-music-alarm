'use strict';

const db = require('../lib/db');

class Alarm {
  constructor(data) {
    if(data.id) this.id = data.id;
    this.rule = data.rule;
    this.name = data.name;
    this.enabled = (data.enabled === undefined) ? true : data.enabled;
  }

  save() {
    return db.run('INSERT INTO `alarms` (rule, name) VALUES (?,?)', [
      this.name, this.rule
    ]);
  }

  static getAll() {
    return db.all('SELECT * FROM `alarms`');
  }
}

module.exports = Alarm;
