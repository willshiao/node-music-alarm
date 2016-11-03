'use strict';

const router = require('express').Router();
const db = require('../../lib/db');

router.get('/', (req, res) => {
  db.getAlarms()
    .then(rows => {
      res.successJson(rows);
    })
    .catch(err => res.errorJson(err));
});

module.exports = router;
