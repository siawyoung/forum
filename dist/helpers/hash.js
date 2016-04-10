'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.passwordAuthenticate = exports.generateToken = exports.hash = undefined;

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
  jwtsecret: 'abcde'
};

var hash = exports.hash = function hash(password) {
  return new Promise(function (resolve, reject) {
    _bcrypt2.default.genSalt(10, function (err, salt) {
      _bcrypt2.default.hash(password, salt, function (err, hash) {
        if (err) {
          return reject(err);
        } else {
          resolve(hash);
        }
      });
    });
  });
};

var generateToken = exports.generateToken = function generateToken(payload) {
  return _jsonwebtoken2.default.sign(payload, config.jwtsecret, {
    expiresIn: 10080
  });
};

var passwordAuthenticate = exports.passwordAuthenticate = function passwordAuthenticate(password, hash) {
  return new Promise(function (resolve, reject) {
    _bcrypt2.default.compare(password, hash, function (err, res) {
      if (err) {
        return reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

var verifyToken = exports.verifyToken = function verifyToken(req) {
  var authHeader = req.headers['authorization'] || req.headers['Authorization'];
  if (!authHeader) {
    return null;
  }
  return _jsonwebtoken2.default.verify(authHeader.replace('Bearer ', ''), config.jwtsecret);
};