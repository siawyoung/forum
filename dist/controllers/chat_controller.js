'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = exports.index = undefined;

var getMessages = function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(roomId) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _redis.pub.existsAsync('rooms:' + roomId + ':messages');

          case 2:
            if (!_context.sent) {
              _context.next = 8;
              break;
            }

            _context.next = 5;
            return _redis.pub.lrangeAsync('rooms:' + roomId + ':messages', -100, -1);

          case 5:
            return _context.abrupt('return', _context.sent);

          case 8:
            return _context.abrupt('return', []);

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getMessages(_x) {
    return ref.apply(this, arguments);
  };
}();

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

var _redis = require('../redis');

var _hash = require('../helpers/hash');

var _time = require('../helpers/time');

var _colors = require('../helpers/colors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var rybColorMixer = require('../helpers/mix');

function sortRoomOrder(room1, room2) {
  if (room1.timestamp < room2.timestamp) {
    return 1;
  } else if (room1.timestamp > room2.timestamp) {
    return -1;
  } else {
    return 0;
  }
}

var index = exports.index = function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(req, reply) {
    var username, roomIds, hydratedRooms;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            username = (0, _hash.verifyToken)(req);
            // console.log(username)

            _context3.next = 4;
            return _redis.pub.smembersAsync('users:' + username + ':rooms');

          case 4:
            roomIds = _context3.sent;
            _context3.next = 7;
            return Promise.all(roomIds.map(function () {
              var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(roomId) {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.t0 = roomId;
                        _context2.next = 3;
                        return _redis.pub.hgetAsync('rooms:' + roomId, 'name');

                      case 3:
                        _context2.t1 = _context2.sent;
                        _context2.next = 6;
                        return _redis.pub.hgetAsync('rooms:' + roomId, 'latest');

                      case 6:
                        _context2.t2 = _context2.sent;
                        _context2.next = 9;
                        return _redis.pub.hgetAsync('rooms:' + roomId, 'color');

                      case 9:
                        _context2.t3 = _context2.sent;
                        _context2.next = 12;
                        return getMessages(roomId);

                      case 12:
                        _context2.t4 = _context2.sent;
                        return _context2.abrupt('return', {
                          id: _context2.t0,
                          name: _context2.t1,
                          timestamp: _context2.t2,
                          color: _context2.t3,
                          messages: _context2.t4
                        });

                      case 14:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, undefined);
              }));

              return function (_x4) {
                return ref.apply(this, arguments);
              };
            }()));

          case 7:
            hydratedRooms = _context3.sent;

            hydratedRooms.sort(sortRoomOrder);
            reply({
              rooms: hydratedRooms
            });
            _context3.next = 15;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3['catch'](0);

            console.log('e', _context3.t0);

          case 15:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 12]]);
  }));

  return function index(_x2, _x3) {
    return ref.apply(this, arguments);
  };
}();

var create = exports.create = function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(username, msg) {
    var roomId, messageTime, oldColor, msgColor, newColor, chatMessage;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            roomId = msg.roomId;
            messageTime = (0, _time.timestamp)();
            _context4.next = 5;
            return _redis.pub.hgetAsync('rooms:' + roomId, 'color');

          case 5:
            oldColor = _context4.sent;
            msgColor = (0, _colors.calculateColorOfMessage)(msg.message);
            newColor = '#' + rybColorMixer.mix([oldColor, msgColor]);
            chatMessage = {
              timestamp: messageTime,
              message: msg.message,
              user: username
            };

            _redis.pub.hmsetAsync('rooms:' + roomId, 'latest', messageTime, 'color', newColor);
            _redis.pub.rpushAsync('rooms:' + roomId + ':messages', JSON.stringify(chatMessage));

            _context4.t0 = _redis.pub;
            _context4.t1 = JSON;
            _context4.next = 15;
            return _redis.pub.smembersAsync('rooms:' + roomId + ':users');

          case 15:
            _context4.t2 = _context4.sent;
            _context4.t3 = {
              roomId: roomId,
              color: newColor,
              message: chatMessage
            };
            _context4.t4 = {
              sockets: _context4.t2,
              message: _context4.t3
            };
            _context4.t5 = _context4.t1.stringify.call(_context4.t1, _context4.t4);

            _context4.t0.publish.call(_context4.t0, 'messages:new', _context4.t5);

            _context4.next = 25;
            break;

          case 22:
            _context4.prev = 22;
            _context4.t6 = _context4['catch'](0);

            console.log('messages:new error!', _context4.t6);

          case 25:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 22]]);
  }));

  return function create(_x5, _x6) {
    return ref.apply(this, arguments);
  };
}();