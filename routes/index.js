var express = require('express');
var router = express.Router();
const tranding = require('../lib/dbfunctions')


  router.get('/', function(req, res, next) {
    console.log(req.query)
    if (!req.query.minutes || !req.query.percents || !req.query.count) {
      res.render('index')
    } else {
      tranding.findTrandingPosts(req.query.minutes, req.query.percents, req.query.count).then(pages => {
        return res.render('index', {pages})
      })
    }
  })



module.exports = router;
