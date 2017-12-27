const express = require('express');
const router = express.Router();

const siteConfig = require('./portal/portal.json');
router.get('/', function(req, res, next) {
    res.render('portal', siteConfig)
});

router.get('/but-how', function(req, res, next) {
    res.render('but-how')
});

router.get('/about', function(req, res, next) {
    res.render('about')
});

module.exports = router;