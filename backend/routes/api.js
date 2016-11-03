'use strict';

const router = require('express').Router();
const db = require('../lib/db');

router.get('/test', (req, res) => {
  res.send('OK');
});

router.get('/media', (req, res) => {
  db.getAllMedia()
    .then(rows => {
      res.json(rows);
    });
});

module.exports = router;
