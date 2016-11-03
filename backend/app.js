'use strict';

const config = require('config');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const Alarm = require('./models/Alarm');
const db = require('./lib/db');
const logger = require('./lib/logger');
require('./lib/extend').extendResponse(express.response);

const apiRoutes = require('./routes/api');

app.use(bodyParser.json());
app.use('/api', apiRoutes);


let createTables = false;

fs.statAsync(config.get('db.path'))
  .catch(err => {
    if(err.code === 'ENOENT') {
      logger.debug('DB not found, going to create tables.');
      createTables = true;
    } else {
      logger.error('Error: ', err);
    }
  })
  .then(() => {
    return db.open(config.get('db.path'));
  })
  .then(() => {
    logger.debug('Connected to DB successfully.');
    if(!createTables) return Promise.resolve();
    logger.debug('Creating tables...');
    return db.createTables();
  })
  .then(() => {
    const port = process.env.PORT || config.get('port');
    app.listen(port, () => {
      logger.info(`App listening on port ${port}.`);
    });
    logger.debug('Loading alarms from the database.');
    return Alarm.getAll();
  })
  .then(alarms => {
    return Promise.all(alarms.map(a => a.schedule()));
  })
  .then(() => {
    logger.info('Done loading all alarms.');
  })
  .catch(logger.error);
