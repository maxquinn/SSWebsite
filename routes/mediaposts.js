var express = require('express');
var router = express.Router();

var mediaPosts = require('../models/media.js');

router.get('/', function(req, res, next) {
  mediaPosts.find(function (err, posts) {
    if (err) return next(err);
    res.json(posts);
  });
});

module.exports = router;