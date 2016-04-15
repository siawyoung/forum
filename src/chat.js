
import { pub, sub } from './redis'
import * as RoomController from './controllers/room_controller'
import * as ChatController from './controllers/chat_controller'

const SocketIO    = require('socket.io')
const socketioJwt = require("socketio-jwt")

const sockets = {}

function chatHandler(socket) {

  const username = socket.decoded_token
  socket.on('rooms:create', (msg) => {
    RoomController.create(username, msg)
  })

  socket.on('messages:new', (msg) => {
    ChatController.create(username, msg)
  })

  socket.on('stickers:new', (msg) => {
    ChatController.sticker(username, msg)
  })
}

async function init(listener) {

  try {

    const io = SocketIO.listen(listener)

    io.sockets
    .on('connection', socketioJwt.authorize({
      secret: 'abcde',
      timeout: 15000 // 15 seconds to send the authentication message
    })).on('authenticated', (socket) => {
      sockets[socket.decoded_token] = socket.id
      chatHandler(socket)
    })

    sub.subscribe('messages:new', 'rooms:created')
    sub.on('message', (channel, message) => {
      console.log(`${channel}: ${message}`)
      const parsedMsg = JSON.parse(message)
      parsedMsg.sockets.forEach(user => {
        let userSocket = io.sockets.connected[sockets[user]]
        if (userSocket) {
          io.sockets.connected[sockets[user]].emit(channel, parsedMsg.message)
        }
      })
    })

  } catch(e) {
    console.log('error during initialization', e)
  }

}

export default init
