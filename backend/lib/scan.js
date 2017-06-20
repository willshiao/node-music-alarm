'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');
const config = require('config');
const _ = require('lodash');


function scan(dirPath) {
  return fs.readdirAsync(dirPath)
    .then(files =>
      Promise.map(files.map(file => path.join(dirPath, file)), scan))
    .catch(() => Promise.resolve(dirPath));
}

function scanDir(dirPath) {
  const ext = config.get('media.extensions');
  const cleanDirs = function cleanDirs(dirs) {
    return _(dirs)
      .flattenDeep()
      .filter(item => ext.includes(path.extname(item).slice(1)))
      .value();
  };

  return scan(dirPath)
    .then(dirs => Promise.resolve(cleanDirs(dirs)));
}

function processItem(itemPath) {
  const absPath = path.resolve(itemPath);
  const info = path.parse(absPath);

  return {
    name: info.name,
    path: absPath,
    tags: info.dir.replace(config.get('media.dir'), '').split(path.sep).filter(s => s),
  };
}

function discover(dirPath) {
  return scanDir(dirPath)
    .map(processItem);
}

module.exports = {
  scan: scanDir,
  process: processItem,
  discover,
};
