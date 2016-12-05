'use strict';

const router = require('express').Router();
const Alarm = require('../../models/Alarm');


router.get('/', (req, res) => {
  Alarm.getAll()
    .then(alarms => res.successJson(alarms))
    .catch(err => res.errorJson(err));
});

router.post(['/', '/new'], (req, res) => {
  if(!req.body || !req.body.rule || !req.body.name) {
    return res.failMsg('Missing one or more form fields');
  }
  const alarm = new Alarm({
    name: req.body.name,
    rule: req.body.rule,
  });
  alarm.save()
    .then(() => res.successJson())
    .catch(err => res.errorJson(err));
  alarm.schedule();
});

router.put('/:id', (req, res) => {
  if(!req.params.id || isNaN(parseInt(req.params.id, 10))) {
    return res.failMsg('Invalid ID');
  }
  if(!req.body || req.body === {}) {
    return res.failMsg('Missing or invalid contents');
  }
  const id = parseInt(req.params.id, 10);
  Alarm.updateById(id, req.body)
    .then(() => res.successJson())
    .catch(err => res.errorJson(err));
});

router.delete('/all', (req, res) => {
  Alarm.deleteAll()
    .then(() => res.successJson())
    .catch(err => res.errorJson(err));
});

router.delete('/:id', (req, res) => {
  if(!req.params.id || isNaN(parseInt(req.params.id, 10))) {
    return res.failMsg('Invalid ID');
  }
  const id = parseInt(req.params.id, 10);
  Alarm.deleteById(id)
    .then(() => res.successJson())
    .catch(err => res.errorJson(err));
});

module.exports = router;
