var express = require('express');
var http = require('http');

var app = express();
app.use(express.static('public', {
  redirect: true
}))

const port = process.env.PORT || 8080; 
console.log("Listening on port: " + port);
//create node.js http server and listen on port
http.createServer(app).listen(port);