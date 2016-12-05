'use strict';

const fs = require('fs');
const router = require('express').Router();
const bodyParser = require('body-parser');
const cors = require('cors');

const Media = require('../models/Media');
const player = require('../lib/player');
const logger = require('../lib/logger');
const mediaRoutes = require('./api/media');
const alarmRoutes = require('./api/alarms');

router.use(cors());
router.use(bodyParser.json());

router.use('/media', mediaRoutes);
router.use('/alarms', alarmRoutes);

router.get('/test', (req, res) => {
  res.send('OK');
});

router.get('/play/random', (req, res) => {
  let current;
  Media.getRandom()
    .then((media) => {
      logger.debug('Playing random media: ', media);
      current = media;
      return player.playMedia(current);
    }).then(() => {
      res.successJson({ playing: current });
    })
    .catch(err => res.errorJson(err));
});

router.get('/play/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  if(!fileName) return res.failMsg('Invalid parameters');
  const media = new Media({
    name: fileName,
    path: fileName,
  });

  fs.stat(media.path, (err) => {
    if(err == null) {
      player.playMedia(media)
        .then(() => res.successJson());
    } else if(err.code === 'ENOENT') {
      res.failMsg('File not found');
    } else {
      res.errorJson(err);
    }
  });
});

router.get('/playing', (req, res) => {
  res.successJson({ playing: player.openMedia || false });
});

router.get('/stop', (req, res) => {
  player.stopMedia()
    .then((status) => {
      if(status) return res.successJson();
      return res.failMsg('No media playing');
    });
});

module.exports = router;
