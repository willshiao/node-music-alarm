'use strict';

const path = require('path');
const config = require('config');
const router = require('express').Router();
const db = require('../lib/db');
const player = require('../lib/player');

router.get('/test', (req, res) => {
  res.send('OK');
});

router.get('/media', (req, res) => {
  db.getAllMedia()
    .then(rows => {
      res.json(rows);
    });
});

router.get('/player:fileName', (req, res) => {
  const fileName = req.params.fileName;
  if(!fileName) return res.json({success: false});
  player.playMedia(path.join(config.get('media.dir'), fileName));
  res.json({success: true});
});

module.exports = router;
