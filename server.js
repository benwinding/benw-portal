const express = require('express');
const path = require("path");
var sitemap = require('express-sitemap');
const app = new express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

const index = require('./views/routes');
app.use('/', index);

const sm = sitemap({
	robots: 'public/robots.txt',
  sitemap: 'public/sitemap.xml',
  sitemapSubmission: '/sitemap.xml',
  route: {
    'ALL': {
      lastmod: new Date().toLocaleDateString(),
      changefreq: 'always',
      priority: 1.0,
    }
  },
});
sm.generate(app);
sm.toFile(); // write this map to file

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log('listening on port: ' + PORT);
