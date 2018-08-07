var connect = require('connect');
var http = require('http');

var history = require('connect-history-api-fallback');
var serveStatic = require('serve-static');

var app = connect();
app.use(history());
app.use(serveStatic("./public"));

const port = process.env.PORT || 8080; 
console.log("Listening on port: " + port);
//create node.js http server and listen on port
http.createServer(app).listen(port);