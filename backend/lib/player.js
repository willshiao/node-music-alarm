'use strict';

const Omx = require('node-omxplayer');
const logger = require('./logger');

const me = module.exports;
me.openPlayer = null; //Currently open player (if any)
me.openMedia = null;
me.stopped = false;


me.playMedia = function(media) {
  if(me.openPlayer !== null) logger.warn('Player instance already open.');

  logger.debug('Playing: ', media.name);
  const player = Omx(media.path);
  me.openPlayer = player;
  me.openMedia = media;
  me.stopped = false;

  player.on('close', () => {
    me.openPlayer = null;
    me.openMedia = null;
    logger.debug('Done playing: ', media.name);
  });

  player.on('error', err => {
    logger.error('Error playing media: ', err);
  });

  return player;
};

me.stopMedia = function() {
  if(me.openPlayer === null || me.openMedia === null) {
    logger.warn('Can\'t stop playing - no media open');
    return false;
  }
  me.openPlayer.quit();
  me.stopped = true;
  logger.debug('Player successfully quit');
  return true;
};

process.on('exit', cleanUp);
process.on('SIGINT', cleanUp);
process.on('uncaughtException', err => {
  logger.error(err);
  cleanUp(1);
});

//Close the player if open
function cleanUp(code) {
  if(code === undefined) code = 0;
  if(me.openPlayer !== null) {
    me.openPlayer.quit();
    logger.debug('Shutting down open omxplayer instance');
  }
  process.exit(code);
}
