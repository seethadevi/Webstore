var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('orders', { title: 'Fermynt' });
});

module.exports = router;
