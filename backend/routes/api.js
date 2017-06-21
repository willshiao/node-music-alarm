'use strict';

const fs = require('fs');
const config = require('config');
const router = require('express').Router();
const bodyParser = require('body-parser');
const cors = require('cors');

const Media = require('../models/Media');
const player = require('../lib/player');
const logger = require('../lib/logger');
const storage = require('../lib/storage');
const MediaHelper = require('../lib/media-helper');
const scan = require('../lib/scan');
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
  MediaHelper.getRandom()
    .then((media) => {
      logger.debug('Playing random media: ', media);
      current = media;
      return player.playMedia(current);
    })
    .then(() => {
      res.successJson({ playing: current });
    })
    .catch(err => res.errorJson(err));
});

router.get('/play', (req, res) => {
  if(!req.query || !req.query.path) return res.failMsg('Invalid parameters');
  const media = new Media({
    name: req.query.path,
    path: req.query.path,
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

router.get('/play/:id', (req, res) => {
  if(!req.params.id) return res.errorMsg('Invalid parameters');

  const mediaId = parseInt(req.params.id, 10);
  if(isNaN(mediaId)) return res.errorMsg('Invalid ID given');

  Media.getById(mediaId)
    .then((media) => {
      logger.debug('Playing by ID: ', media);
      return player.playMedia(media);
    })
    .then(() => res.successJson())
    .catch(err => res.errorJson(err));
});

router.get('/guess/:id', (req, res) => {
  if(!req.params.id) return res.errorMsg('Invalid parameters');

  const guessId = parseInt(req.params.id, 10);
  if(isNaN(guessId)) return res.errorMsg('Invalid ID guessed');
  logger.debug(`Got guess for ID: ${guessId}`);

  if(player.openMedia === null) return res.failMsg('No media playing');
  if(storage.timeout) return res.failMsg('Cannot guess yet');

  if(player.openMedia.id !== guessId) {
    logger.debug(`Guess incorrect, ${guessId} !== ${player.openMedia.id}`);
    storage.timeout = true;
    setTimeout(() => { storage.timeout = false; }, config.get('alarm.guessInterval'));

    const wasPlaying = player.openMedia;
    let rand;
    return MediaHelper.getRandom()
      .then((media) => {
        logger.debug('Playing random media: ', media);
        rand = media;
        return player.playMedia(media);
      })
      .then(() => player.openMedia.increment({ numIncorrect: 1 }))
      .then(() =>
        res.successJson({
          correct: false,
          wasPlaying,
          playing: rand,
          duration: config.get('alarm.guessInterval'),
        }))
      .catch(err => res.errorJson(err));
  }
  logger.debug('Guess correct.');
  return player.openMedia.increment({ numCorrect: 1 })
    .thne(() => player.stopMedia())
    .then(() => res.successJson({ correct: true }));
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

router.get('/discover', (req, res) => {
  scan.discover(config.get('media.dir'))
    .then(media => Media.bulkCreate(media))
    .then(() => Media.findAll())
    .then((media) => {
      res.successJson({ media });
    })
    .catch(err => res.errorJson(err));
});

module.exports = router;
