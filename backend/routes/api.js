'use strict';

const fs = require('fs');
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
      res.successJson(rows);
    })
    .catch(err => res.errorJson(err));
});

router.get('/play/:fileName', (req, res) => {
  let fileName = req.params.fileName;
  if(!fileName) return res.failMsg('Invalid parameters');
  fileName = filterPath(path.join(config.get('media.dir'), fileName));

  fs.stat(fileName, (err, stat) => {
    if(err == null) {
      player.playMedia(fileName);
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
