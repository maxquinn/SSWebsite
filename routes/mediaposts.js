var express = require('express');
var router = express.Router();

var mediaPosts = require('../models/media.js');

router.get('/', function(req, res, next) {
  var pageNum = parseInt(req.query.pageToLoad);
  var limitNum = parseInt(req.query.perPage);
  mediaPosts.paginate({}, {sort : {dateTime: -1}, page: pageNum, limit: limitNum}, function (err, posts) {
    if (err) return next(err);
    res.json(posts);
  });
});

module.exports = router;