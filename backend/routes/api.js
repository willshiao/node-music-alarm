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

router.get('/play/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  if(!fileName) return res.json({ success: false });

  player.playMedia(filterPath(path.join(config.get('media.dir'), fileName)));
  res.json({ success: true });
});

router.get('/stop', (req, res) => {
  res.json({ success: player.stopMedia() });
});


function filterPath(pathStr) { //Prevent directory tranversals
  return path.normalize(pathStr).replace(/^(\.\.[\/\\])+/, '');
}

module.exports = router;
