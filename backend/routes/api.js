'use strict';

const fs = require('fs');
const path = require('path');
const config = require('config');
const router = require('express').Router();
const bodyParser = require('body-parser');

const Media = require('../models/Media');
const player = require('../lib/player');
const logger = require('../lib/logger');
const mediaRoutes = require('./api/media');
const alarmRoutes = require('./api/alarms');

router.use('/media', mediaRoutes);
router.use('/alarms', alarmRoutes);
router.use(bodyParser.json());

router.get('/test', (req, res) => {
  res.send('OK');
});

router.get('/play/random', (req, res) => {
  Media.getRandom()
    .then(media => {
      logger.debug('Playing random media: ', media);
      player.playMedia(media);
      res.successJson({playing: media});
    })
    .catch(err => res.errorJson(err));
});

router.get('/play/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  if(!fileName) return res.failMsg('Invalid parameters');
  const media = new Media({
    name: fileName,
    path: path.join(config.get('media.dir'), fileName),
  });

  fs.stat(media.path, (err, stat) => {
    if(err == null) {
      player.playMedia(media);
      res.successJson();
    } else if(err.code == 'ENOENT') {
      res.failMsg('File not found');
    } else {
      res.errorJson(err);
    }
  });
});

router.get('/playing', (req, res) => {
  return res.successJson({playing: player.openNow === null});
});

router.get('/stop', (req, res) => {
  if(player.stopMedia()) return res.successJson();
  return res.failJson('No media playing');
});

module.exports = router;
