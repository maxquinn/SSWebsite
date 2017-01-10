var express = require('express');
var router = express.Router();

router.get('/', verifyAuth, function (req, res) {
  res.render('../views/admin.pug');
});

function verifyAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
}

module.exports = router;