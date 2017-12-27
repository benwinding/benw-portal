const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('portal');
});

router.get('/but-how', function(req, res, next) {
    res.render('but-how');
});

router.get('/about', function(req, res, next) {
    res.render('about');
});

module.exports = router;