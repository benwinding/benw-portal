const express = require('express');
const router = express.Router();

const siteConfig = require('./models/portal.json');
router.get('/', function(req, res, next) {
    res.render('portal', siteConfig)
});

module.exports = router;