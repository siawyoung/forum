#!/usr/bin/env node
'use strict';

require('babel-polyfill');

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _inert = require('inert');

var _inert2 = _interopRequireDefault(_inert);

var _vision = require('vision');

var _vision2 = _interopRequireDefault(_vision);

var _auth_controller = require('./controllers/auth_controller');

var AuthController = _interopRequireWildcard(_auth_controller);

var _room_controller = require('./controllers/room_controller');

var RoomController = _interopRequireWildcard(_room_controller);

var _chat_controller = require('./controllers/chat_controller');

var ChatController = _interopRequireWildcard(_chat_controller);

var _chat = require('./chat');

var _chat2 = _interopRequireDefault(_chat);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var server = new _hapi2.default.Server();

server.connection({
  host: '0.0.0.0',
  port: Number(process.env.PORT)
});

server.register([_inert2.default, _vision2.default], _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;


          server.views({
            engines: {
              html: require('handlebars')
            },
            path: __dirname + '/views',
            layoutPath: __dirname + '/views/layouts',
            layout: 'main'
          });

          server.route([{
            method: 'GET', path: '/',
            handler: function handler(req, reply) {
              return reply.view('index', { react: 'chat' });
            }
          }, {
            method: 'GET', path: '/register',
            handler: function handler(req, reply) {
              return reply.view('index', { react: 'register' });
            }
          }, {
            method: 'GET', path: '/login',
            handler: function handler(req, reply) {
              return reply.view('index', { react: 'login' });
            }
          }, { method: 'GET', path: '/{react}.react.js',
            handler: function handler(req, reply) {
              // if (req.params.react)
              // check for malicious request params
              return reply.file(__dirname + '/../dist/components/' + req.params.react + '.react.js');
            }
          }, { method: 'GET', path: '/store.min.js', handler: { file: __dirname + '/scripts/store.min.js' } }, { method: 'GET', path: '/avgrund.js', handler: { file: __dirname + '/scripts/avgrund.js' } }, { method: 'GET', path: '/jquery.tagsinput.js', handler: { file: __dirname + '/scripts/jquery.tagsinput.js' } }, { method: 'GET', path: '/main.css', handler: { file: __dirname + '/../dist/main.css' } }, {
            method: 'POST', path: '/register',
            handler: AuthController.register
          }, {
            method: 'POST', path: '/login',
            handler: AuthController.login
          }, {
            method: 'GET', path: '/load',
            handler: ChatController.index
          }, {
            method: 'POST', path: '/stickers',
            handler: ChatController.create_sticker
          }]);

          _context.next = 5;
          return server.start();

        case 5:
          _context.next = 7;
          return (0, _chat2.default)(server.listener);

        case 7:
          console.log('Server initialized!');
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context['catch'](0);

          console.log('server start error', _context.t0);

        case 13:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined, [[0, 10]]);
})));

module.exports = server;