'use strict';

const logger = require('../lib/logger');

module.exports.extendResponse = function(response) {
  response.successJson = function(data) {
    if(data === undefined) data = {};
    return this.json({
      status: 'success',
      data: data
    });
  };

  response.errorJson = function(err) {
    logger.error(err);
    return this.json({
      status: 'error',
      error: err.message || err
    });
  };

  response.failMsg = function(msg) {
    return this.json({
      status: 'fail',
      message: msg
    });
  };

  response.errorMsg = function(msg) {
    return this.json({
      status: 'error',
      message: msg
    });
  };
};
