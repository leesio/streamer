const fetch = require('node-fetch')
const names = require('./names.json')
const facts = require('./facts.json')

let count = 0

module.exports = {
  time: () => `${new Date().toLocaleTimeString()} GMT`,
  date: () => new Date(),
  fact: () => facts[(Math.random() * facts.length) << 0],
  name: () => names[(Math.random() * names.length) << 0],
  color: () => '#' + Math.floor(Math.random() * 16777215).toString(16),
  percent: () => (Math.random() * 100) << 0,
  card: () =>
    fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
      .then(res => res.json())
      .then(data => data.cards[0])
      .catch(e => console.log('card failed')),
  bitcoin: () =>
    fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(res => res.json())
      .then(data => `$${data.bpi.USD.rate}`)
      .catch(e => console.log('bitcoin failed')),
  venmo: () =>
    fetch('https://venmo.com/api/v5/public?limit=1')
      .then(res => res.json())
      .then(({ data }) => ({
        from: data[0].actor.name,
        to: data[0].transactions[0].target.name,
        message: data[0].message,
      }))
      .catch(e => console.log('venmo failed', e)),
}
