'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sub = exports.pub = undefined;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_bluebird2.default.promisifyAll(_redis2.default.RedisClient.prototype);
_bluebird2.default.promisifyAll(_redis2.default.Multi.prototype);

var pub = exports.pub = _redis2.default.createClient();
var sub = exports.sub = _redis2.default.createClient();