'use strict';

const logger = require('./logger');
const scheduler = require('node-schedule');
const Media = require('../models/Media');
const Alarm = require('../models/Alarm');
const player = require('./player');
const storage = require('./storage');

class AlarmHelper {
  static schedule(alarm) {
    logger.debug(`Scheduling ${alarm.name} (ID: ${alarm.id}) with rule ${alarm.rule}.`);
    const job = scheduler.scheduleJob(alarm.rule, () => {
      const playRandom = (firstRun) => {
        if(!firstRun && player.stopped) return;
        Media.getRandom()
          .then(media => player.playMedia(media, false, () => {
            setTimeout(playRandom, 1000);
          }));
      };
      playRandom(true);
    });
    storage.alarms[alarm.id] = job;
    return job;
  }

  static scheduleById(id) {
    return Alarm.findById(id)
      .then(alarm => AlarmHelper.schedule(alarm));
  }
}

module.exports = AlarmHelper;
