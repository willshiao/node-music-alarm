'use strict';

const path = require('path');


module.exports =
{
  port: 3000,
  db: {
    path: path.resolve(__dirname, '../files/alarm.db'),
    schema: path.resolve(__dirname, '../files/schema.sql'),
  },
  media: {
    dir: path.resolve(__dirname, '../files/media'),
    extensions: ['mp4', 'mp3'],
  },
  player: {
    initialVolume: -5,
    output: 'local',  // Output interface - local, hdmi, or both
    loop: false,
  },
  alarm: {
    guessInterval: 15000,  // Minimium amount of time between guesses, in milliseconds.
  },
};
