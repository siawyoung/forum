#!/usr/bin/env node

import 'babel-polyfill'
import Hapi from 'hapi'
import Inert from 'inert'
import Vision from 'vision'
const server = new Hapi.Server()

import * as AuthController from './controllers/auth_controller'
import * as RoomController from './controllers/room_controller'
import * as ChatController from './controllers/chat_controller'

import init from './chat'

server.connection({
  host: '0.0.0.0',
  port: Number(process.env.PORT)
})

server.register([Inert, Vision], async () => {

  try {

    server.views({
      engines: {
        html: require('handlebars')
      },
      path: `${__dirname}/views`,
      layoutPath: `${__dirname}/views/layouts`,
      layout: 'main'
    })

    server.route([

      {
        method: 'GET', path: '/',
        handler: (req, reply) => {
          return reply.view('index', { react: 'chat' })
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
          return reply.file(`${__dirname}/../dist/components/${req.params.react}.react.js`)
        }
      },

      { method: 'GET', path: '/store.min.js', handler: { file: `${__dirname}/scripts/store.min.js` } },
      { method: 'GET', path: '/avgrund.js', handler: { file: `${__dirname}/scripts/avgrund.js` } },
      { method: 'GET', path: '/mediaStreamRecorder.js', handler: { file: `${__dirname}/scripts/mediaStreamRecorder.js` } },
      { method: 'GET', path: '/jquery.tagsinput.js', handler: { file: `${__dirname}/scripts/jquery.tagsinput.js` } },
      { method: 'GET', path: '/longpress.js', handler: { file: `${__dirname}/scripts/longpress.js` } },

      { method: 'GET', path: '/main.css',  handler: { file: `${__dirname}/../dist/main.css` } },

      {
        method: 'POST', path: '/register',
        handler: AuthController.register
      },

      {
        method: 'POST', path: '/login',
        handler: AuthController.login
      },

      {
        method: 'GET', path: '/load',
        handler: ChatController.index
      },

      {
        method: 'POST', path: '/stickers',
        handler: ChatController.create_sticker
      }

    ]);

    await server.start()
    await init(server.listener)
    console.log('Server initialized!')
  } catch(e) {
    console.log('server start error', e)
  }

})

module.exports = server