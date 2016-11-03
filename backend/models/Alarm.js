'use strict';

const db = require('../lib/db');
const scheduler = require('node-schedule');
const Media = require('./Media');
const player = require('../lib/player');

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

  schedule() {
    return scheduler.scheduleJob(this.rule, () => {
      Media.getRandom()
        .then(media => {
          player.playMedia(media);
        });
    });
  }

  static getAll() {
    return db.all('SELECT * FROM `alarms`')
      .then(alarms => Promise.resolve(alarms.map(a => new Alarm(a))));
  }
}

module.exports = Alarm;
