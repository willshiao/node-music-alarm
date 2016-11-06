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
      const playRandom = () => {
        Media.getRandom()
          .then(media => {
            const p = player.playMedia(media);
            p.on('close', () => {
              if(!player.stopped) setTimeout(playRandom, 1000);
            });
          });
      };
      playRandom();
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

  static deleteById(id) {
    return db.run('DELETE FROM `alarms` WHERE id=?', id);
  }

  static deleteAll() {
    return db.run('DELETE FROM `alarms`');
  }
}

module.exports = Alarm;
