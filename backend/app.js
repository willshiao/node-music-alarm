'use strict';

const config = require('config');
const express = require('express');

const Alarm = require('./models/Alarm');
const Media = require('./models/Media');
const AlarmHelper = require('./lib/alarm-helper');
const logger = require('./lib/logger');
require('./lib/extend').extendResponse(express.response);

const apiRoutes = require('./routes/api');

const app = express();
app.use('/api', apiRoutes);


Alarm.sync({ force: false })
  .then(() => Media.sync({ force: false }))
  .then(() => {
    const port = process.env.PORT || config.get('port');
    app.listen(port, () => {
      logger.info(`App listening on port ${port}.`);
    });
    logger.debug('Loading alarms from the database.');
    return Alarm.findAll({ where: { enabled: true } });  // Only get enabled alarms
  })
  .then((alarms) => {
    alarms.forEach(AlarmHelper.schedule);
    logger.info('Done loading all alarms.');
  })
  .catch(logger.error);
