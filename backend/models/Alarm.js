'use strict';

const db = require('../lib/db');
const logger = require('../lib/logger');
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
      this.rule, this.name
    ]);
  }

  schedule() {
    logger.debug(`Scheduling ${this.name} with rule ${this.rule}`);
    return scheduler.scheduleJob(this.rule, () => {
      Media.getRandom()
        .then(media => {
          player.playMedia(media);
        });
    });
  }

  static getAll() {
    return db.all('SELECT * FROM `alarms` WHERE enabled=1')
      .then(alarms => Promise.resolve(alarms.map(a => new Alarm(a))));
  }

  static getById(id) {
    return db.get('SELECT * FROM `alarms` WHERE id=? AND enabled=1', id)
      .then(alarm => Promise.resolve(new Alarm(alarm)));
  }
}

module.exports = Alarm;
