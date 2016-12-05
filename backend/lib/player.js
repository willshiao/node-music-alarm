'use strict';

const Omx = require('node-omxplayer');
const logger = require('./logger');
const config = require('config');

const me = module.exports;
me.openPlayer = null;  // Currently open player (if any)
me.openMedia = null;
me.stopped = false;


me.playMedia = function playMedia(media) {
  if(me.openPlayer !== null) {
    logger.warn('Player instance already open, closing current player.');
    me.stopped = true;
    me.openPlayer.quit();
  }

  logger.debug('Playing: ', media.name);
  const player = Omx(media.path, config.get('player.output'), config.get('player.loop'),
    config.get('player.initialVolume'));
  me.openPlayer = player;
  me.openMedia = media;
  me.stopped = false;

  player.on('close', () => {
    me.openPlayer = null;
    me.openMedia = null;
    logger.debug('Done playing: ', media.name);
  });

  player.on('error', (err) => {
    logger.error('Error playing media: ', err);
  });

  return player;
};

me.stopMedia = function stopMedia() {
  if(me.openPlayer === null || me.openMedia === null) {
    logger.warn('Can\'t stop playing - no media open');
    return false;
  }
  me.openPlayer.quit();
  me.stopped = true;
  logger.debug('Player successfully quit');
  return true;
};

// Close the player if open
function cleanUp(code = 0) {
  if(me.openPlayer !== null) {
    me.openPlayer.quit();
    logger.debug('Shutting down open omxplayer instance');
  }
  process.exit(code);
}

process.on('exit', cleanUp);
process.on('SIGINT', cleanUp);
process.on('uncaughtException', (err) => {
  logger.error(err);
  cleanUp(1);
});
