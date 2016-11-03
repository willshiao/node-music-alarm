'use strict';

const config = require('config');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const express = require('express');
const app = express();

const db = require('./lib/db');
const logger = require('./lib/logger');
require('./lib/extend').extendResponse(express.response);

const apiRoutes = require('./routes/api');

app.use('/api', apiRoutes);

db.open(config.get('db.path'))
  .then(() => {
    logger.debug('Connected to DB successfully.');
    return fs.statAsync(config.get('db.path'));
  })
  .catch(err => {
    if(err.code === 'ENOENT') {
      logger.debug('DB not found, creating tables.');
      return db.createTables();
    } else {
      logger.error('Error: ', err);
    }
  })
  .then(() => {
    const port = process.env.PORT || config.get('port');
    app.listen(port, () => {
      logger.info(`App listening on port ${port}.`);
    });
  });
