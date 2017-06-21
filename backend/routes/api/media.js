'use strict';

const path = require('path');
const config = require('config');
const multer = require('multer');
const mkdirp = require('mkdirp');

const router = require('express').Router();
const player = require('../../lib/player');
const Media = require('../../models/Media');
const MediaHelper = require('../../lib/media-helper');


function addMediaPath(pathStr) {
  return path.join(config.get('media.dir'), pathStr);
}

const mediaStorage = multer.diskStorage({
  destination(req, file, cb) {
    let folderName = '';
    if(req.body && req.body.folder) folderName = req.body.folder;
    folderName = addMediaPath(folderName);
    mkdirp(Media.filterPath(folderName), (err) => {
      if(err) return cb(err);
      cb(null, folderName);
    });
  },
  filename(req, file, cb) {
    let filename = file.originalname;
    if(req.body && req.body.filename) {
      const ext = path.extname(filename);
      filename = req.body.filename;
      if(path.extname(filename) !== ext) {
        // Change file extension to original extension
        filename = path.basename(filename, path.extname(filename));
        filename += ext;
      }
    }
    cb(null, filename);
  },
});

router.get('/', (req, res) => {
  Media.findAll()
    .then((rows) => {
      res.successJson(rows);
    })
    .catch(err => res.errorJson(err));
});

router.delete('/all', (req, res) => {
  Media.destroy({ truncate: true })
    .then(() => {
      res.successJson();
    })
    .catch(err => res.errorJson(err));
});

const mediaUpload = multer({ storage: mediaStorage });
router.post('/upload', mediaUpload.single('mediaFile'), (req, res) => {
  if(!req.body) return res.failMsg('No arguments found.');
  if(!req.body.name) return res.failMsg('No name found.');
  if(!req.file) return res.failMsg('No file found.');

  const media = {
    path: req.file.path,
    name: req.body.name,
  };
  Media.create(media)
    .then((built) => {
      res.successJson(built);
    })
    .catch(err => res.errorJson(err));
});

router.post(['/', '/new'], (req, res) => {
  if(!req.body) return res.failMsg('No arguments found');

  if(req.body.media && req.body.media.constructor === Array
      && req.body.media.length > 0) {
    // Treat as multiple elements
    const media = req.body.media
      .map((m) => {
        if(!m || !m.path || !m.name) return null;
        m.path = addMediaPath(m.path);
        return Media.create(m);
      })
      .filter(m => m !== null);

    if(media.length <= 0) return res.failMsg('No valid elements found');
    return Promise.all(media)
      .then(() => {
        res.successJson({ numSaved: media.length });
      })
      .catch(err => res.errorJson(err));
  } else if(!req.body.path || !req.body.name) {
    return res.failMsg('Missing one or more arguments');
  }

  Media.create({
    path: addMediaPath(req.body.path),
    name: req.body.name,
  }).save()
    .then(() => {
      res.successJson();
    })
    .catch(err => res.errorJson(err));
});

router.delete('/:id', (req, res) => {
  if(!req.params.id || isNaN(parseInt(req.params.id, 10))) {
    return res.failMsg('Invalid ID');
  }
  const id = parseInt(req.params.id, 10);
  Media.deleteById(id)
    .then(() => {
      res.successJson();
    })
    .catch(err => res.errorJson(err));
});

router.get('/play/:id', (req, res) => {
  if(!req.params.id || isNaN(parseInt(req.params.id, 10))) {
    return res.failMsg('Invalid ID');
  }
  const id = parseInt(req.params.id, 10);
  Media.getById(id)
    .then((media) => {
      if(!media) {
        res.failJson('No media with that ID found');
      } else {
        player.playMedia(media);
        res.successJson({ playing: media });
      }
    })
    .catch(err => res.errorJson(err));
});

router.get('/random', (req, res) => {
  MediaHelper.getRandom()
    .then((row) => {
      res.successJson(row);
    })
    .catch(err => res.errorJson(err));
});

router.get('/random/:limit', (req, res) => {
  if(!req.params.limit || isNaN(parseInt(req.params.limit, 10))) {
    return res.errorJson('Invalid limit');
  }

  const limit = parseInt(req.params.limit, 10);
  MediaHelper.getRandomLimit(limit)
    .then(media => res.successJson(media))
    .catch(err => res.errorJson(err));
});

module.exports = router;
