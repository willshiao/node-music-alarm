'use strict';

const router = require('express').Router();
const Alarm = require('../../models/Alarm');
const storage = require('../../lib/storage');


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
    .then(() => {
      res.successJson();
      alarm.schedule();
    })
    .catch(err => res.errorJson(err));
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
    .then(() => {
      if(req.body.enabled === false && id in storage.alarms) {
        Alarm.cancelById(id);
      }
      res.successJson();
    })
    .catch(err => res.errorJson(err));
});

router.delete('/all', (req, res) => {
  Alarm.deleteAll()
    .then(() => {
      this.storage.alarms.forEach((item, key) => {
        item.cancel();
        delete this.storage[key];
      });
      res.successJson();
    })
    .catch(err => res.errorJson(err));
});

router.delete('/:id', (req, res) => {
  if(!req.params.id || isNaN(parseInt(req.params.id, 10))) {
    return res.failMsg('Invalid ID');
  }
  const id = parseInt(req.params.id, 10);
  Alarm.deleteById(id)
    .then(() => {
      Alarm.cancelById(id);
      res.successJson();
    })
    .catch(err => res.errorJson(err));
});

module.exports = router;
