'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = exports.create = undefined;

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

var _redis = require('../redis');

var _time = require('../helpers/time');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var create = exports.create = function create(username, msg) {

  var name = msg.name;
  var users = [username].concat(_toConsumableArray(msg.users));
  var roomId = _nodeUuid2.default.v4();
  users.forEach(function (user) {
    _redis.pub.saddAsync('users:' + user + ':rooms', roomId);
  });
  _redis.pub.saddAsync.apply(_redis.pub, ['rooms:' + roomId + ':users'].concat(_toConsumableArray(users)));
  _redis.pub.hmsetAsync('rooms:' + roomId, 'name', name, 'latest', (0, _time.timestamp)(), 'color', '#333333');

  _redis.pub.publish('rooms:created', JSON.stringify({
    sockets: users,
    message: {
      id: roomId,
      name: name,
      messages: [],
      color: '#333333'
    }
  }));
};

var remove = exports.remove = function remove(req, reply) {};