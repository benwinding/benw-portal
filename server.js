const express = require('express');
const path = require("path");
const app = new express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

const router = require('./views/router');
app.use('/', router);

require('./sitemap')(app, router);

app.use(function(req, res, next) {
		res.status(404).render('error', {url: req.url});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log('listening on port: ' + PORT);
