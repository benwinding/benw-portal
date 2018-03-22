const express = require('express');
const router = express.Router();
YAML = require('yamljs');

const portalTiles = YAML.load('./views/portal/tiles.yaml');
router.get('/', function(req, res, next) {
    res.render('portal', { layout : 'layout', inputTiles: portalTiles });
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

const oldSiteImages = YAML.load('./views/old-site/image-list.yaml');
router.get('/old-site', function(req, res, next) {
    res.render('old-site', {layout: 'layout', inputList: oldSiteImages});
});

module.exports = router;