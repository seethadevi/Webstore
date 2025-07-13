var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('webmail', { title: 'Fermynt' });
});

module.exports = router;
