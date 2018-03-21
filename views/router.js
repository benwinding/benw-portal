const express = require('express');
const router = express.Router();
YAML = require('yamljs');
// Load yaml file using YAML.load
const portalTiles = YAML.load('./views/portal/tiles.yaml');

router.get('/', function(req, res, next) {
    res.render('portal', { layout : 'layout', json: portalTiles });
});

router.get('/but-how', function(req, res, next) {
    res.render('but-how');
});

router.get('/about', function(req, res, next) {
    res.render('about');
});

router.get('/engineering', function(req, res, next) {
    res.render('engineering');
});

module.exports = router;