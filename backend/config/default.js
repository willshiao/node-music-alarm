'use strict';

module.exports =
{
  port: 3000,
  db: {
    path: './files/alarm.db',
    schema: './files/schema.sql',
  },
  media: {
    dir: './files/media',
    extensions: ['mp4', 'mp3'],
  },
  player: {
    initialVolume: -5,
    output: 'local',  // Output interface - local, hdmi, or both
    loop: false,
  },
};
