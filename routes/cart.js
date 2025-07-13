var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('cart', { title: 'Fermynt' });
});

module.exports = router;