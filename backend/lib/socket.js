'use strict';

const config = require('config');
const Promise = require('bluebird');
const io = require('socket.io')();

const logger = require('./logger');
const player = require('./player');

io.on('connection', (socket) => {
  logger.debug('Socket connected');

  socket.on('playing', () => {
    socket.emit('playing:res', player.openMedia || false);
  });
});

module.exports = io;