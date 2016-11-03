'use strict';

const fs = require('fs');
const path = require('path');
const config = require('config');
const router = require('express').Router();

const Media = require('../models/Media');
const player = require('../lib/player');
const mediaRoutes = require('./api/media');
const alarmRoutes = require('./api/alarms');

router.use('/media', mediaRoutes);
router.use('/alarms', alarmRoutes);

router.get('/test', (req, res) => {
  res.send('OK');
});

router.get('/play/:fileName', (req, res) => {
  let fileName = req.params.fileName;
  if(!fileName) return res.failMsg('Invalid parameters');
  fileName = filterPath(path.join(config.get('media.dir'), fileName));

  fs.stat(fileName, (err, stat) => {
    if(err == null) {
      player.playMedia(new Media({
        path: fileName,
        name: fileName
      }));
      res.successJson();
    } else if(err.code == 'ENOENT') {
      res.failMsg('File not found');
    } else {
      res.errorJson(err);
    }
  });
});

router.get('/stop', (req, res) => {
  if(player.stopMedia()) return res.successJson();
  return res.failJson('No media playing');
});


function filterPath(pathStr) { //Prevent directory tranversals
  return path.normalize(pathStr).replace(/^(\.\.[\/\\])+/, '');
}

module.exports = router;
