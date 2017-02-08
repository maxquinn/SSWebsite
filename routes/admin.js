var express = require('express');
var router = express.Router();
var mediaPost = require('../models/media.js');

router.get('/', verifyAuth, function (req, res) {
  res.render('../views/admin.pug');
});

function verifyAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
}

router.post('/submitpost', function (req, res) {
    var post = new mediaPost();
    post.title = req.body.title;
    post.video = req.body.video;
    post.vidDesc = req.body.vidDesc;

    post.save(function (err) {
        if (err)
            res.send(err);
        res.json({ message: 'Post Created' });
    });
});

router.delete('/delete/:id', function (req, res) {
    mediaPost.remove({
        _id: req.params.id
    }, function (err, post) {
        if (err) res.send(err);
        res.json({ message: 'Successfully deleted' });
    });
});

module.exports = router;