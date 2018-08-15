const Pusher = require('pusher');
const sources = require('./sources');
const http = require('http');
const fs = require('fs');

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  host: process.env.PUSHER_HTTP_HOST,
  forceTLS: true,
});

const sourceKeys = Object.keys(sources);
const run = () => {
  let idx = (Math.random() * sourceKeys.length) << 0;
  Promise.resolve(sources[sourceKeys[idx]]()).then(payload => {
    pusher.trigger(`private-${sourceKeys[idx]}`, 'default', payload)
  });
};

const handleAuthRequest = (req, res) => {
  let body = []
  req
    .on('data', (chunk) => body.push(chunk))
    .on('end', () => {
      body = Buffer.concat(body).toString()
      obj = body.split('&').reduce((mem, p) => {
        [key, val] = p.split('=');
        mem[key] = val;
        return mem
      }, {})
      let authString = pusher.authenticate(obj.socket_id, obj.channel_name)
      res.write(JSON.stringify(authString))
      res.end()
    });
}
const startHttpServer = () => {
  let template = fs.readFileSync('index.html');
  http
    .createServer((req, res) => {
      if(req.url === '/pusher/auth' && req.method === 'POST') {
        handleAuthRequest(req, res)
        return
      }
      res.setHeader('content-type', 'text/html');
      res.write(template.toString().trim());
      res.end();
    })
    .listen(process.env.PORT);
};

setInterval(run, 3000 + Math.random() * 2000);
startHttpServer();
