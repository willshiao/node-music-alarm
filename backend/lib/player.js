'use strict';

const Omx = require('node-omxplayer');
const logger = require('./logger');

let openPlayer = null; //Currently open player (if any)

module.exports.playMedia = function(file) {
  if(openPlayer !== null) {
    logger.warn('Player instance already open.');
  }
  const player = Omx(file);
  openPlayer = player;
  player.on('close', () => {
    openPlayer = null;
  });
  return player;
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
