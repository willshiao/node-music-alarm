'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');
const config = require('config');
const _ = require('lodash');


/**
 * Recursively scan a path for all files
 * @param  {string}   dirPath   The directory to scan
 * @return {[string]}           An array of strings and string arrays
 *                               (note: can be more than one level deep)
 */
function scan(dirPath) {
  return fs.readdirAsync(dirPath)
    .then(files =>
      Promise.map(files.map(file => path.join(dirPath, file)), scan))
    .catch(() => Promise.resolve(dirPath));
}

/**
 * Scan a path for all accepted file types
 * @param  {string}   dirPath   The directory to scan
 * @return {[string]}           An array of filenames
 */
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

/**
 * Retrive information about an item, given its path
 * @param  {string} itemPath
 * @return {Object}           An object containing the media item's attributes
 */
function processItem(itemPath) {
  const absPath = path.resolve(itemPath);
  const info = path.parse(absPath);

  return {
    name: info.name,
    path: absPath,
    tags: info.dir.replace(config.get('media.dir'), '')
      .split(path.sep)
      .filter(s => s),
  };
}

/**
 * Scan a directory and return an array of information about all of the items in the path
 * @param  {string} dirPath   Directory to scan
 * @return {[Object]}         Array of information about each item - see processItem()
 */
function discover(dirPath) {
  return scanDir(dirPath)
    .map(processItem);
}

module.exports = {
  scan: scanDir,
  process: processItem,
  discover,
};
