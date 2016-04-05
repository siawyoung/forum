
import { pub, sub } from './redis'
import * as RoomController from './controllers/room_controller'

const SocketIO    = require('socket.io')
const socketioJwt = require("socketio-jwt")

function chatHandler(socket) {

  const username = socket.decoded_token
  socket.on('room:create', (msg) => {
    RoomController.create(username, msg)
  })
}

async function init(listener) {

  const sockets = {}

  try {

    const io = SocketIO.listen(listener)

    io.sockets
    .on('connection', socketioJwt.authorize({
      secret: 'abcde',
      timeout: 15000 // 15 seconds to send the authentication message
    })).on('authenticated', (socket) => {
      sockets[socket.decoded_token] = socket
      chatHandler(socket)
    })

    sub.subscribe('message:new', 'rooms:created')
    sub.on('message', (channel, message) => {
      console.log(`${channel}: ${message}`)
      // io.emit
      // const parsedMsg = JSON.parse(message)
      // parsedMsg.sockets.forEach((socket) => {
      //   socket.
      // })
    })

  } catch(e) {
    console.log('e')
    console.log(e)
  }

}

export default init


// function chatHandler2 (socket) {

//   // welcome new clients
//   socket.emit('io:welcome', 'hi!')

//   socket.on('io:name', function (name) {
//     pub.HSET("people", socket.client.conn.id, name);
//     // console.log(socket.client.conn.id + " > " + name + ' joined chat!');
//     pub.publish("chat:people:new", name);
//   });

//   socket.on('io:message', function (msg) {
//     console.log("msg:", msg);
//     msg = sanitise(msg);
//     pub.HGET("people", socket.client.conn.id, function (err, name) {
//       // console.log("io:message received: " + msg + " | from: " + name);
//       var str = JSON.stringify({ // store each message as a JSON object
//   m: msg,
//   t: new Date().getTime(),
//   n: name
//       });
//       console.log(str);
//       pub.RPUSH("chat:messages", str);   // chat history
//       pub.publish("chat:messages:latest", str);  // latest message
//     })
//   });

//   /* istanbul ignore next */
//   socket.on('error', function (err) { console.error(err.stack) })
//   // how should we TEST socket.io error? (suggestions please!)
// }

/**
 * chat is our Public interface
 * @param {object} (http) listener [required]
 */
// function init_backup (listener, callback) {
//   // setup redis pub/sub independently of any socket.io connections
//   pub.on("ready", function () {
//     // console.log("PUB Ready!");
//     sub.on("ready", function () {
//       sub.subscribe("chat:messages:latest", "chat:people:new");
//       // now start the socket.io
//       io = SocketIO.listen(listener);
//       io.on('connection', chatHandler);
//       // Here's where all Redis messages get relayed to Socket.io clients
//       sub.on("message", function (channel, message) {
//         console.log(channel + " : " + message);
//         io.emit(channel, message); // relay to all connected socket.io clients
//       });
//       setTimeout(function(){ callback() }, 300); // wait for socket to boot
//     });
//   });
// }