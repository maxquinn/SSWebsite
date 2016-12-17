var express = require('express');
var router = express.Router();

router.get('/', verifyAuth, function(req, res) {
  res.render('../views/admin.pug');
});

function verifyAuth(req, res, next) {
  if (!req.isAuthenticated()) {
    res.status('UNAUTHORIZED');
    return res.redirect('/login');
  }
  console.log('you are logged in homie');
  next();
}

module.exports = router;