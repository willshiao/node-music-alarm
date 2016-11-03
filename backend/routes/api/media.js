'use strict';

const router = require('express').Router();
const Media = require('../../models/Media');

router.get('/', (req, res) => {
  Media.getAll()
    .then(rows => {
      res.successJson(rows);
    })
    .catch(err => res.errorJson(err));
});

router.get('/random', (req, res) => {
  Media.getRandom()
    .then(row => {
      res.successJson(row);
    })
    .catch(err => res.errorJson(err));
});

module.exports = router;
