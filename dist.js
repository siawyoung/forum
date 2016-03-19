#!/usr/bin/env node
'use strict';

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _inert = require('inert');

var _inert2 = _interopRequireDefault(_inert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = new _hapi2.default.Server();

server.connection({
  host: '0.0.0.0',
  port: Number(process.env.PORT)
});

server.register(_inert2.default, function () {

  server.route([{ method: 'GET', path: '/', handler: { file: "./src/front/index.html" } },
  // switch these two routes for a /static handler?
  { method: 'GET', path: '/client.js', handler: { file: './src/front/client.js' } }, { method: 'GET', path: '/style.css', handler: { file: './src/front/style.css' } }, { method: 'GET', path: '/load', handler: require('./src/load_messages').load }]);

  server.start(function () {
    require('./src/chat').init(server.listener, function () {
      console.log('Feeling Chatty?', 'listening on: http://127.0.0.1:' + process.env.PORT);
    });
  });
});

module.exports = server;
