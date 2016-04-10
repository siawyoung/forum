'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var init = function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(listener) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:

            try {
              (function () {

                var io = SocketIO.listen(listener);

                io.sockets.on('connection', socketioJwt.authorize({
                  secret: 'abcde',
                  timeout: 15000 // 15 seconds to send the authentication message
                })).on('authenticated', function (socket) {
                  sockets[socket.decoded_token] = socket.id;
                  chatHandler(socket);
                });

                _redis.sub.subscribe('messages:new', 'rooms:created');
                _redis.sub.on('message', function (channel, message) {
                  console.log(channel + ': ' + message);
                  var parsedMsg = JSON.parse(message);
                  parsedMsg.sockets.forEach(function (user) {
                    var userSocket = io.sockets.connected[sockets[user]];
                    if (userSocket) {
                      io.sockets.connected[sockets[user]].emit(channel, parsedMsg.message);
                    }
                  });
                });
              })();
            } catch (e) {
              console.log('error during initialization', e);
            }

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function init(_x) {
    return ref.apply(this, arguments);
  };
}();

var _redis = require('./redis');

var _room_controller = require('./controllers/room_controller');

var RoomController = _interopRequireWildcard(_room_controller);

var _chat_controller = require('./controllers/chat_controller');

var ChatController = _interopRequireWildcard(_chat_controller);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var SocketIO = require('socket.io');
var socketioJwt = require("socketio-jwt");

var sockets = {};

function chatHandler(socket) {

  var username = socket.decoded_token;
  socket.on('rooms:create', function (msg) {
    RoomController.create(username, msg);
  });

  socket.on('messages:new', function (msg) {
    ChatController.create(username, msg);
  });
}

exports.default = init;