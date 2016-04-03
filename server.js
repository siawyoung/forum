#!/usr/bin/env node

import Hapi from 'hapi'
import Inert from 'inert'
import Vision from 'vision'
const server = new Hapi.Server()

import * as AuthController from './src/controllers/auth'

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
        return reply.view('index', { react: 'new_chat' })
      }
    },

    {
      method: 'GET', path: '/register',
      handler: (req, reply) => {
        return reply.view('index', { react: 'register' })
      }
    },

    {
      method: 'GET', path: '/login',
      handler: (req, reply) => {
        return reply.view('index', { react: 'login' })
      }
    },

    { method: 'GET', path: '/{react}.react.js',
      handler: (req, reply) => {
        // if (req.params.react)
        // check for malicious request params
        return reply.file(`./dist/components/${req.params.react}.react.js`)
      }
    },

    // Can deprecate this soon
    { method: 'GET', path: '/client.js', handler: { file: './src/scripts/client.js' } },

    { method: 'GET', path: '/store.min.js', handler: { file: './src/scripts/store.min.js' } },

    { method: 'GET', path: '/main.css',  handler: { file: './dist/styles/main.css' } },
    { method: 'GET', path: '/load',      handler: require('./src/load_messages').load },

    // POST
    {
      method: 'POST', path: '/register',
      handler: AuthController.register
    },

    {
      method: 'POST', path: '/login',
      handler: AuthController.login
    },

  ]);

  server.start(() => {
    require('./src/chat').init(server.listener, () => {
      console.log('Feeling Chatty?', 'listening on: http://127.0.0.1:' + process.env.PORT)
    })
  })

})

module.exports = server