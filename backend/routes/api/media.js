'use strict';

const router = require('express').Router();
const Media = require('../../models/Media');

router.get('/', (req, res) => {
  Media.getAll()
    .then(rows => {
      res.successJson(rows);
    })
    .catch(err => res.errorJson(err));
});

router.get('/clear', (req, res) => {
  Media.deleteAll()
    .then(() => {
      res.successJson();
    })
    .catch(err => res.errorJson(err));
});

router.post('/new', (req, res) => {
  if(!req.body)
    return res.failMsg('No arguments found');
  if(req.body.media && req.body.media.constructor === Array
  && req.body.media.length > 0) {
    //Treat as multiple elements
    const media = req.body.media
      .map(m => {
        if(!m || !m.path || !m.name) return null;
        return new Media(m).save();
      })
      .filter(m => m !== null);

    if(media.length <= 0)
      return res.failMsg('No valid elements found');
    return Promise.all(media)
      .then(() => {
        res.successJson({numSaved: media.length});
      })
      .catch(err => res.errorJson(err));
  } else if(!req.body.path || !req.body.name)
    return res.failMsg('Missing one or more arguments');

  new Media({
    path: req.body.path,
    name: req.body.name,
  }).save()
    .then(() => {
      res.successJson();
    })
    .catch(err => res.errorJson(err));
});

router.get('/random', (req, res) => {
  Media.getRandom()
    .then(row => {
      res.successJson(row);
    })
    .catch(err => res.errorJson(err));
});

module.exports = router;
