'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = exports.register = undefined;

var _redis = require('../redis');

var _hash2 = require('../helpers/hash');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var register = exports.register = function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, reply) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = _redis.pub;
            _context.t1 = 'users:' + req.payload.username;
            _context.t2 = req.payload.username;
            _context.next = 5;
            return (0, _hash2.hash)(req.payload.password);

          case 5:
            _context.t3 = _context.sent;
            _context.next = 8;
            return _context.t0.hmsetAsync.call(_context.t0, _context.t1, 'username', _context.t2, 'password', _context.t3);

          case 8:
            return _context.abrupt('return', reply());

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function register(_x, _x2) {
    return ref.apply(this, arguments);
  };
}();

var login = exports.login = function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, reply) {
    var _hash, token;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _redis.pub.existsAsync('users:' + req.payload.username);

          case 3:
            if (!_context2.sent) {
              _context2.next = 17;
              break;
            }

            _context2.next = 6;
            return _redis.pub.hgetAsync('users:' + req.payload.username, 'password');

          case 6:
            _hash = _context2.sent;
            _context2.next = 9;
            return (0, _hash2.passwordAuthenticate)(req.payload.password, _hash);

          case 9:
            if (!_context2.sent) {
              _context2.next = 15;
              break;
            }

            token = (0, _hash2.generateToken)(req.payload.username);

            console.log(token);
            reply(token);
            _context2.next = 17;
            break;

          case 15:
            console.log('401');
            reply().code(401);

          case 17:
            _context2.next = 22;
            break;

          case 19:
            _context2.prev = 19;
            _context2.t0 = _context2['catch'](0);

            console.log('e', _context2.t0);

          case 22:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 19]]);
  }));

  return function login(_x3, _x4) {
    return ref.apply(this, arguments);
  };
}();