'use strict';

const router = require('express').Router();
const Alarm = require('../../models/Alarm');
const AlarmHelper = require('../../lib/alarm-helper');
const storage = require('../../lib/storage');
const logger = require('../../lib/logger');


router.get('/', (req, res) => {
  Alarm.findAll()
    .then(alarms => res.successJson(alarms))
    .catch(err => res.errorJson(err));
});

router.post(['/', '/new'], (req, res) => {
  if(!req.body || !req.body.rule || !req.body.name) {
    return res.failMsg('Missing one or more form fields');
  }
  Alarm.create({
    name: req.body.name,
    rule: req.body.rule,
  })
    .then((alarm) => {
      AlarmHelper.schedule(alarm);
      res.successJson();
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
  logger.debug(`Updating alarm with ID = ${id} to `, req.body);

  Alarm.update(req.body, { where: { id } })
    .then(() => {
      if(req.body.enabled === false && id in storage.alarms) {
        AlarmHelper.cancelById(id);
        res.successJson();
      } else if(req.body.enabled === true && !(id in storage.alarms)) {
        return AlarmHelper.scheduleById(id)
          .then(() => res.successJson());
      } else {
        logger.debug('Value of alarm not changed');
        res.failMsg(`Alarm state already ${req.body.enabled}; not changed.`);
      }
    })
    .catch(err => res.errorJson(err));
});

router.delete('/all', (req, res) => {
  Alarm.sync({ forced: true })  // Lazy truncate
    .then(() => {
      storage.alarms.forEach((item, key) => {
        item.cancel();
        delete storage[key];
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
  Alarm.destroy({ where: { id } })
    .then(() => {
      AlarmHelper.cancelById(id);  // In case it's enabled
      res.successJson();
    })
    .catch(err => res.errorJson(err));
});

module.exports = router;
