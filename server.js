const express = require('express');
const path = require("path");
const app = new express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/public'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/google91ab19b9428bca2d.html', function (req, res) {
  res.renderFile('google91ab19b9428bca2d.html');
});

const siteConfig = require('./public/portal/portal.json');
app.get('/', function (req, res) {
  res.render('portal/portal', siteConfig)
});

const about = require('./public/about/about.json');
app.get('/about', function (req, res) {
  res.render('about/about', about)
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log('listening on port: ' + PORT);
