const express = require('express');
const path = require("path");
const app = new express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

const index = require('./routes/index');
const about = require('./routes/about');

app.use('/', index);
app.use('/about', about);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log('listening on port: ' + PORT);
