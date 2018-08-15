const Pusher = require('pusher');
const sources = require('./sources');
const http = require('http');
const fs = require('fs');

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  forceTLS: true,
});

const sourceKeys = Object.keys(sources);
const run = () => {
  let idx = (Math.random() * sourceKeys.length) << 0;
  Promise.resolve(sources[sourceKeys[idx]]()).then(payload =>
    pusher.trigger(sourceKeys[idx], 'default', payload),
  );
};

const startHttpServer = () => {
  let template = fs.readFileSync('index.html');
  http
    .createServer((req, res) => {
      res.setHeader('content-type', 'text/html');
      res.write(template.toString().trim());
      res.end();
    })
    .listen(process.env.PORT);
};

setInterval(run, 3000 + Math.random() * 2000);
startHttpServer();
