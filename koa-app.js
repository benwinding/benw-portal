'use strict';
const serve = require('koa-static-server');
const koa = require('koa');

let app = new koa();

// logger
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

// root index support
// GET /
// returns index.html
// GET /file.txt
// returns file.txt
app.use(serve({rootDir: 'public'}));

const PORT = process.env.PORT || 8000;
app.listen(PORT);
console.log('listening on port: ' + PORT);
