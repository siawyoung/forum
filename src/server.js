
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
  port: Number(8000)
})

server.register([Inert, Vision], async () => {

  console.log(__dirname)

  server.views({
    engines: {
      html: require('handlebars')
    },
    path: `./views`,
    layoutPath: `./views/layouts`,
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
        return reply.file(`./components/${req.params.react}.react.js`)
      }
    },

    { method: 'GET', path: '/store.min.js', handler: { file: `./scripts/store.min.js` } },
    { method: 'GET', path: '/avgrund.js', handler: { file: `./scripts/avgrund.js` } },
    { method: 'GET', path: '/jquery.tagsinput.js', handler: { file: `./scripts/jquery.tagsinput.js` } },

    { method: 'GET', path: '/main.css',  handler: { file: `./main.css` } },

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

  ]);

  try {
    await server.start()
    await init(server.listener)
    console.log('Server initialized!')
  } catch(e) {
    console.log('server start error', e)
  }




})

module.exports = server