'use strict';

const logger = require('./logger');
const scheduler = require('node-schedule');
const Media = require('../models/Media');
const Alarm = require('../models/Alarm');
const player = require('./player');
const storage = require('./storage');
const MediaHelper = require('./media-helper');

class AlarmHelper {
  static schedule(alarm) {
    logger.debug(`Scheduling ${alarm.name} (ID: ${alarm.id}) with rule ${alarm.rule}.`);
    const job = scheduler.scheduleJob(alarm.rule, () => {
      const playRandom = (firstRun) => {
        if(!firstRun && player.stopped) return;
        MediaHelper.getRandom()
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

  static cancel(alarm) {
    if(alarm.id === undefined || !(alarm.id in storage.alarms)) {
      logger.debug('Failed to cancel job - maybe it was already disabled?');
      return;
    }
    logger.debug(`Attempting to cancel job with ID ${alarm.id}.`);
    storage.alarms[alarm.id].cancel();
    delete storage.alarms[alarm.id];
  }

  static cancelById(id) {
    if(!(id in storage.alarms)) {
      logger.debug(`Failed to cancel job with ID=${id}.`);
      return;
    }
    logger.debug(`Attempting to cancel job with ID ${id}.`);
    storage.alarms[id].cancel();
    delete storage.alarms[id];
  }
}

module.exports = AlarmHelper;
