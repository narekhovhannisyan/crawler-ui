var express = require('express');
var router = express.Router();
const tranding = require('../lib/dbfunctions')

tranding.findTrandingPosts().then(pages => {
  console.log(pages)
  router.get('/', function(req, res, next) {
  res.render('index', { pages })
  })
})


module.exports = router;
