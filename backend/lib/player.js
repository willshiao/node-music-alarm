'use strict';

const Omx = require('node-omxplayer');
const logger = require('./logger');

let openPlayer = module.exports.openPlayer = null; //Currently open player (if any)
let openMedia = module.exports.openMedia = null;


module.exports.playMedia = function(media) {
  if(openPlayer !== null) logger.warn('Player instance already open.');

  logger.debug('Playing: ', media.name);
  const player = Omx(media.path);
  openPlayer = player;
  openMedia = media;

  player.on('close', () => {
    openPlayer = null;
    openMedia = null;
    logger.debug('Done playing: ', media.name);
  });

  player.on('error', err => {
    logger.error('Error playing media: ', err);
  });

  return player;
};

module.exports.stopMedia = function() {
  if(openPlayer === null || openMedia === null) {
    logger.warn('Can\'t stop playing - no media open');
    return false;
  }
  openPlayer.quit();
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
  if(openPlayer !== null) {
    openPlayer.quit();
    logger.debug('Shutting down open omxplayer instance');
  }
  process.exit(code);
}
