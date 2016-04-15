'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.client = undefined;

var _knox = require('knox');

var _knox2 = _interopRequireDefault(_knox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var env = require('../env');

var client = exports.client = _knox2.default.createClient({
  key: env.aws.key,
  secret: env.aws.secret,
  bucket: env.aws.bucket
});