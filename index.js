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

const channels = Object.keys(sources)
const run = () =>
  Promise.all(Object.values(sources).map(x => x())).then(values =>
    values.map((payload, i) => pusher.trigger(channels[i], 'default', payload))
  )

setInterval(run, 3000 + Math.random() * 2000)

const template = `
--------------------------------------------------
To get started, copy and paste the below code
into a html file or try it online here:
https://codepen.io/lukejacksonn/pen/VBdeOa
--------------------------------------------------

<script src="https://js.pusher.com/4.2/pusher.min.js"></script>
<script>
  var pusher = new Pusher('e8f388c50dfc938652ce', { cluster: 'eu' })
  pusher.subscribe('bitcoin').bind('default', console.log)
</script>
`

http
  .createServer((req, res) => {
    res.write(template.trim())
    res.end()
  })
  .listen(process.env.PORT)
