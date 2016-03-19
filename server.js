#!/usr/bin/env node

import Hapi from 'hapi'
import Inert from 'inert'
const server = new Hapi.Server()

server.connection({
  host: '0.0.0.0',
  port: Number(process.env.PORT)
})

server.register(Inert, () => {

  server.route([
    { method: 'GET', path: '/', handler: { file: "./src/front/index.html" } },
    // switch these two routes for a /static handler?
    { method: 'GET', path: '/client.js', handler: { file: './src/front/client.js' } },
    { method: 'GET', path: '/style.css', handler: { file: './src/front/style.css' } },
    { method: 'GET', path: '/load',      handler: require('./src/load_messages').load }
  ]);

  server.start(() => {
    require('./src/chat').init(server.listener, () => {
      console.log('Feeling Chatty?', 'listening on: http://127.0.0.1:' + process.env.PORT)
    })
  })

})

module.exports = server