'use strict';

const config = require('config');
const express = require('express');
const app = express();

const db = require('./lib/db');
const logger = require('./lib/logger');

const apiRoutes = require('./routes/api');

app.use('/api', apiRoutes);


db.open(config.get('db.path'))
  .then(() => {
    logger.debug('Connected to DB successfully.');
    const port = process.env.PORT || config.get('port');
    app.listen(port, () => {
      logger.info(`App listening on port ${port}.`);
    });
  });
