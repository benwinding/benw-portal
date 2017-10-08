const express = require('express');
const path = require("path");
const app = new express();

app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

const siteConfig = require('./content/portalGridConfig.json');
app.get('/', function (req, res) {
  res.render('index', siteConfig)
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log('listening on port: ' + PORT);
