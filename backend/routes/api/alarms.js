'use strict';

const router = require('express').Router();
const Alarm = require('../../models/Alarm');


router.get('/', (req, res) => {
  Alarm.getAll()
    .then(alarms => res.successJson(alarms))
    .catch(err => res.errorJson(err));
});

router.post([ '/', '/new' ], (req, res) => {
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
  alarm.schedule();
});

router.delete('/:id', (req, res) => {
  if(!req.params.id || isNaN(parseInt(req.params.id)))
    return res.failMsg('Invalid ID');
  const id = parseInt(req.params.id);
  Alarm.getById(id)
    .then(item => {
      res.successJson(item);
    })
    .catch(err => res.errorJson(err));
});

router.delete('/all', (req, res) => {
  Alarm.deleteAll()
    .then(() => res.successJson())
    .catch(err => res.errorJson(err));
});

module.exports = router;
