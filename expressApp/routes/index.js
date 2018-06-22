var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');

var url = 'mongodb://localhost:27017'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cool', success: true, errors: req.session.errors });
  req.session.errors = null;
});






module.exports = router;
