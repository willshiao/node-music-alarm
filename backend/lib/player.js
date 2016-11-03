'use strict';

const Omx = require('node-omxplayer');
const logger = require('./logger');

let openPlayer = null; //Currently open player (if any)

module.exports.playMedia = function(file) {
  if(openPlayer !== null) logger.warn('Player instance already open.');

  logger.debug('Playing: ', file);
  const player = Omx(file);
  openPlayer = player;

  player.on('close', () => {
    openPlayer = null;
    logger.debug('Done playing: ', file);
  });

  return player;
};

module.exports.stopMedia = function() {
  if(openPlayer === null) {
    logger.warn('Can\'t stop playing - no media open');
    return false;
  }
  openPlayer.quit();
  logger.debug('Player successfully quit');
  return true;
};

process.on('exit', cleanUp);
process.on('SIGINT', cleanUp);
process.on('uncaughtException', cleanUp);

//Close the player if open
function cleanUp() {
  if(openPlayer !== null) {
    openPlayer.quit();
  }
}
