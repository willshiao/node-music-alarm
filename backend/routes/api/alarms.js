'use strict';

const router = require('express').Router();
const Alarm = require('../../models/Alarm');

router.get('/', (req, res) => {
  Alarm.getAll()
    .then(rows => {
      res.successJson(rows);
    })
    .catch(err => res.errorJson(err));
});

router.post('/new', (req, res) => {
  if(!req.body || !req.body.rule || !req.body.name)
    return res.failMsg('Missing one or more form fields');
  const alarm = new Alarm({
    name: req.body.name,
    rule: req.body.rule,
  });
  alarm.save()
    .then(() => {
      res.successJson();
    })
    .catch(err => res.errorJson(err));
  console.log(alarm.schedule());
});

module.exports = router;
