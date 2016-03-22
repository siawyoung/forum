#!/usr/bin/env node

import Hapi from 'hapi'
import Inert from 'inert'
const Vision = require('vision')
const server = new Hapi.Server()

server.connection({
  host: '0.0.0.0',
  port: Number(process.env.PORT)
})

server.register([Inert, Vision], () => {

  server.views({
    engines: {
      html: require('handlebars')
    },
    path: `${__dirname}/src/views`,
    layoutPath: './src/views/layouts',
    layout: 'main'
  })

  server.route([

    {
      method: 'GET', path: '/',
      handler: (req, reply) => {
        return reply.view('index', { react: 'index' })
      }
    },

    {
      method: 'GET', path: '/chats',
      handler: (req, reply) => {
        return reply.view('chats', { react: 'chats' })
      }
    },

    {
      method: 'GET', path: '/chat',
      handler: (req, reply) => {
        return reply.view('chat')
      }
    },

    {
      method: 'GET', path: '/new_chat',
      handler: (req, reply) => {
        return reply.view('new_chat', { react: 'new_chat' })
      }
    },

    { method: 'GET', path: '/{react}.react.js',
      handler: (req, reply) => {
        // if (req.params.react)
        // check for malicious request params
        return reply.file(`./dist/components/${req.params.react}.react.js`)
      }
    },

    // switch these two routes for a /static handler?
    { method: 'GET', path: '/client.js', handler: { file: './src/scripts/client.js' } },
    { method: 'GET', path: '/main.css',  handler: { file: './dist/styles/main.css' } },
    { method: 'GET', path: '/load',      handler: require('./src/load_messages').load }
  ]);

  server.start(() => {
    require('./src/chat').init(server.listener, () => {
      console.log('Feeling Chatty?', 'listening on: http://127.0.0.1:' + process.env.PORT)
    })
  })

})

module.exports = server