#!/usr/bin/env node

require("source-map-support").install();
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("babel-polyfill");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	__webpack_require__(1);

	var _hapi = __webpack_require__(3);

	var _hapi2 = _interopRequireDefault(_hapi);

	var _inert = __webpack_require__(4);

	var _inert2 = _interopRequireDefault(_inert);

	var _vision = __webpack_require__(5);

	var _vision2 = _interopRequireDefault(_vision);

	var _auth_controller = __webpack_require__(6);

	var AuthController = _interopRequireWildcard(_auth_controller);

	var _room_controller = __webpack_require__(13);

	var RoomController = _interopRequireWildcard(_room_controller);

	var _chat_controller = __webpack_require__(16);

	var ChatController = _interopRequireWildcard(_chat_controller);

	var _chat = __webpack_require__(21);

	var _chat2 = _interopRequireDefault(_chat);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

	var server = new _hapi2.default.Server();

	server.connection({
	  host: '0.0.0.0',
	  port: Number(8000)
	});

	server.register([_inert2.default, _vision2.default], _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
	  return regeneratorRuntime.wrap(function _callee$(_context) {
	    while (1) {
	      switch (_context.prev = _context.next) {
	        case 0:

	          console.log(__dirname);

	          server.views({
	            engines: {
	              html: __webpack_require__(24)
	            },
	            path: './views',
	            layoutPath: './views/layouts',
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
	              return reply.file('./components/' + req.params.react + '.react.js');
	            }
	          }, { method: 'GET', path: '/store.min.js', handler: { file: './scripts/store.min.js' } }, { method: 'GET', path: '/avgrund.js', handler: { file: './scripts/avgrund.js' } }, { method: 'GET', path: '/jquery.tagsinput.js', handler: { file: './scripts/jquery.tagsinput.js' } }, { method: 'GET', path: '/main.css', handler: { file: './main.css' } }, {
	            method: 'POST', path: '/register',
	            handler: AuthController.register
	          }, {
	            method: 'POST', path: '/login',
	            handler: AuthController.login
	          }, {
	            method: 'GET', path: '/load',
	            handler: ChatController.index
	          }]);

	          _context.prev = 3;
	          _context.next = 6;
	          return server.start();

	        case 6:
	          _context.next = 8;
	          return (0, _chat2.default)(server.listener);

	        case 8:
	          console.log('Server initialized!');
	          _context.next = 14;
	          break;

	        case 11:
	          _context.prev = 11;
	          _context.t0 = _context['catch'](3);

	          console.log('server start error', _context.t0);

	        case 14:
	        case 'end':
	          return _context.stop();
	      }
	    }
	  }, _callee, undefined, [[3, 11]]);
	})));

	module.exports = server;
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("hapi");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("inert");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("vision");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.login = exports.register = undefined;

	var _redis = __webpack_require__(7);

	var _hash2 = __webpack_require__(10);

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

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.sub = exports.pub = undefined;

	var _bluebird = __webpack_require__(8);

	var _bluebird2 = _interopRequireDefault(_bluebird);

	var _redis = __webpack_require__(9);

	var _redis2 = _interopRequireDefault(_redis);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_bluebird2.default.promisifyAll(_redis2.default.RedisClient.prototype);
	_bluebird2.default.promisifyAll(_redis2.default.Multi.prototype);

	var pub = exports.pub = _redis2.default.createClient();
	var sub = exports.sub = _redis2.default.createClient();

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("bluebird");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("redis");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.verifyToken = exports.passwordAuthenticate = exports.generateToken = exports.hash = undefined;

	var _bcrypt = __webpack_require__(11);

	var _bcrypt2 = _interopRequireDefault(_bcrypt);

	var _jsonwebtoken = __webpack_require__(12);

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

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("bcrypt");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("jsonwebtoken");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.remove = exports.create = undefined;

	var _nodeUuid = __webpack_require__(14);

	var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

	var _redis = __webpack_require__(7);

	var _time = __webpack_require__(15);

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

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("node-uuid");

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var timestamp = exports.timestamp = function timestamp() {
	  return new Date().getTime();
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

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

	var _nodeUuid = __webpack_require__(14);

	var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

	var _redis = __webpack_require__(7);

	var _hash = __webpack_require__(10);

	var _time = __webpack_require__(15);

	var _colors = __webpack_require__(17);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

	var rybColorMixer = __webpack_require__(18);

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

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var palette = {
	  happy: '#DDBF00',
	  sad: '#8F928B',
	  angry: '#b8312f',
	  loving: '#F07D7D',
	  neutral: '#296ab1'
	};

	String.prototype.contains = function (regex) {
	  return regex.test(this);
	};

	function combine(wordArr) {
	  return new RegExp(wordArr.join('|'), 'i');
	}

	var happyPhrases = combine(['haha', 'lol', 'rofl', 'funny', 'hehe']);

	var sadPhrases = combine(['sian', 'sucks', 'zz', 'sigh']);

	var angryPhrases = combine(['oi', 'wtf', 'fk', 'shit']);

	var lovingPhrases = combine(['love', 'darling', 'like', 'luv']);

	var calculateColorOfMessage = exports.calculateColorOfMessage = function calculateColorOfMessage(msg) {
	  if (msg.contains(happyPhrases)) {
	    return palette.happy;
	  }

	  if (msg.contains(sadPhrases)) {
	    return palette.sad;
	  }

	  if (msg.contains(angryPhrases)) {
	    return palette.angry;
	  }

	  if (msg.contains(lovingPhrases)) {
	    return palette.loving;
	  }

	  return palette.neutral;
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	(function () {

	    // Real Life Color Mixer by Camilo Tapia (github.com/Camme)
	    // Emulate color mixing as if you where mixing real life colors, ie substractive colors
	    //
	    // Usage:
	    //
	    // RLColorMixer.mixColorS(arrayOfColors);
	    // where arrayOFColos is an array of hex rgb colors ['#ff0000', '#00ff00'] or an array with the amoutn of each color
	    // [{color: '#ff0000', parts: 10}, {color: '#00ff00', parts: 2}].
	    // or a mizture of the two.
	    //
	    // You can also snap to the nearest color in an array of hex rgb colors:
	    // RLColorMixer.findNearest(orgColorinHex, listOfColors);
	    //
	    // Example:
	    // RLColorMixer.findNearest('#fff000', ['#ff0000', '#ff0f00']);
	    //

	    var rybColorMixer = {};

	    var defaults = { result: "ryb", hex: true };

	    function mix() {

	        var options = JSON.parse(JSON.stringify(defaults));

	        // check if the last arguments is an options object
	        var lastObject = arguments[arguments.length - 1];
	        if ((typeof lastObject === "undefined" ? "undefined" : _typeof(lastObject)) == "object" && lastObject.constructor != Array) {
	            var customOptions = lastObject;
	            options.result = customOptions.result || options.result;
	            options.hex = typeof customOptions.hex != "undefined" ? customOptions.hex : options.hex;
	            arguments.length--;
	        }

	        var colors = [];

	        // check if we got an array, but not if the array is just a representation of hex
	        if (arguments[0].constructor == Array && typeof arguments[0][0] != "number") {
	            colors = arguments[0];
	        } else {
	            colors = arguments;
	        }

	        //normalize, ie make sure all colors are in the same format
	        var normalized = [];
	        for (var i = 0, ii = colors.length; i < ii; i++) {
	            var color = colors[i];
	            if (typeof color == "string") {
	                color = hexToArray(color);
	            }
	            normalized.push(color);
	        }

	        var newColor = mixRYB(normalized);

	        if (options.result == "rgb") {
	            newColor = rybToRgb(newColor);
	        }

	        if (options.hex) {
	            newColor = arrayToHex(newColor);
	        }

	        return newColor;
	    }

	    function mixRYB(colors) {

	        var newR = 0;
	        var newY = 0;
	        var newB = 0;

	        var total = 0;

	        var maxR = 0;
	        var maxY = 0;
	        var maxB = 0;

	        for (var i = 0, ii = colors.length; i < ii; i++) {

	            var color = colors[i];

	            newR += color[0];
	            newY += color[1];
	            newB += color[2];
	        }

	        // Calculate the max of all sums for each color
	        var max = Math.max(newR, newY, newB);

	        // Now calculate each channel as a percentage of the max
	        var totalR = Math.floor(newR / max * 255);
	        var totalY = Math.floor(newY / max * 255);
	        var totalB = Math.floor(newB / max * 255);

	        return [totalR, totalY, totalB];
	    }

	    function findNearest(color, list) {

	        var listCopy = list.concat([]);

	        listCopy.sort(function (c1, c2) {

	            var rgb1 = hexToArray(c1);
	            var rgb2 = hexToArray(c2);
	            var c = hexToArray(color);

	            rgb1 = rgb2hsv(rgb1);
	            rgb2 = rgb2hsv(rgb2);
	            c = rgb2hsv(c);

	            var euclideanDistance1 = Math.sqrt(Math.pow(c[0] - rgb1[0], 2) + Math.pow(c[1] - rgb1[1], 2) + Math.pow(c[2] - rgb1[2], 2));
	            var euclideanDistance2 = Math.sqrt(Math.pow(c[0] - rgb2[0], 2) + Math.pow(c[1] - rgb2[1], 2) + Math.pow(c[2] - rgb2[2], 2));
	            return euclideanDistance1 - euclideanDistance2;
	        });

	        return listCopy[0].replace("#", "");
	    }

	    function hexToArray(hex) {
	        var hex = hex.replace("#", '');
	        var r = parseInt(hex.substr(0, 2), 16);
	        var g = parseInt(hex.substr(2, 2), 16);
	        var b = parseInt(hex.substr(4, 2), 16);
	        return [r, g, b];
	    }

	    // taken from the INTERNET
	    function rgb2hsv(color) {
	        var rr,
	            gg,
	            bb,
	            r = color[0] / 255,
	            g = color[1] / 255,
	            b = color[2] / 255,
	            h,
	            s,
	            v = Math.max(r, g, b),
	            diff = v - Math.min(r, g, b),
	            diffc = function diffc(c) {
	            return (v - c) / 6 / diff + 1 / 2;
	        };

	        if (diff == 0) {
	            h = s = 0;
	        } else {
	            s = diff / v;
	            rr = diffc(r);
	            gg = diffc(g);
	            bb = diffc(b);

	            if (r === v) {
	                h = bb - gg;
	            } else if (g === v) {
	                h = 1 / 3 + rr - bb;
	            } else if (b === v) {
	                h = 2 / 3 + gg - rr;
	            }
	            if (h < 0) {
	                h += 1;
	            } else if (h > 1) {
	                h -= 1;
	            }
	        }
	        return [Math.round(h * 360), Math.round(s * 100), Math.round(v * 100)];
	    }

	    function arrayToHex(rgbArray) {
	        var rHex = Math.round(rgbArray[0]).toString(16);rHex = rHex.length == 1 ? "0" + rHex : rHex;
	        var gHex = Math.round(rgbArray[1]).toString(16);gHex = gHex.length == 1 ? "0" + gHex : gHex;
	        var bHex = Math.round(rgbArray[2]).toString(16);bHex = bHex.length == 1 ? "0" + bHex : bHex;
	        return rHex + gHex + bHex;;
	    }

	    function cubicInt(t, A, B) {
	        var weight = t * t * (3 - 2 * t);
	        return A + weight * (B - A);
	    }

	    function getR(iR, iY, iB) {
	        // red
	        var x0 = cubicInt(iB, 1.0, 0.163);
	        var x1 = cubicInt(iB, 1.0, 0.0);
	        var x2 = cubicInt(iB, 1.0, 0.5);
	        var x3 = cubicInt(iB, 1.0, 0.2);
	        var y0 = cubicInt(iY, x0, x1);
	        var y1 = cubicInt(iY, x2, x3);
	        return Math.ceil(255 * cubicInt(iR, y0, y1));
	    }

	    function getG(iR, iY, iB) {
	        // green
	        var x0 = cubicInt(iB, 1.0, 0.373);
	        var x1 = cubicInt(iB, 1.0, 0.66);
	        var x2 = cubicInt(iB, 0.0, 0.0);
	        var x3 = cubicInt(iB, 0.5, 0.094);
	        var y0 = cubicInt(iY, x0, x1);
	        var y1 = cubicInt(iY, x2, x3);
	        return Math.ceil(255 * cubicInt(iR, y0, y1));
	    }

	    function getB(iR, iY, iB) {
	        // blue
	        var x0 = cubicInt(iB, 1.0, 0.6);
	        var x1 = cubicInt(iB, 0.0, 0.2);
	        var x2 = cubicInt(iB, 0.0, 0.5);
	        var x3 = cubicInt(iB, 0.0, 0.0);
	        var y0 = cubicInt(iY, x0, x1);
	        var y1 = cubicInt(iY, x2, x3);
	        return Math.ceil(255 * cubicInt(iR, y0, y1));
	    }

	    function rybToRgb(color, options) {

	        if (typeof color == "string") {
	            color = hexToArray(color);
	        }

	        var R = color[0] / 255;
	        var Y = color[1] / 255;
	        var B = color[2] / 255;
	        var R1 = getR(R, Y, B);
	        var G1 = getG(R, Y, B);
	        var B1 = getB(R, Y, B);
	        var ret = [R1, G1, B1];

	        if (options && options.hex == true) {
	            ret = arrayToHex(ret);
	        }

	        return ret;
	    }

	    function rybToRgbHex(color) {
	        var rgb = rybToRgb(color);
	        return arrayToHex(rgb);
	    }

	    /**
	     * Return the complementary color values for a given color.
	     * You must also give it the upper limit of the color values, typically 255 for
	     * GUIs, 1.0 for OpenGL.
	     */
	    function complimentary(color, limit) {
	        var r = color[0],
	            g = color[1],
	            b = color[2];
	        limit = limit || 255;
	        return [limit - r, limit - g, limit - b];
	    }

	    if ("function" === "function" && __webpack_require__(20) && typeof window != "undefined") {
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	            return rybColorMixer;
	        }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof window != "undefined") {
	        window.rybColorMixer = rybColorMixer;
	    } else if (module && exports) {
	        module.exports = rybColorMixer;
	    }

	    rybColorMixer.mix = mix;
	    rybColorMixer.rybToRgb = rybToRgb;
	    rybColorMixer.findNearest = findNearest;
	})();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(19)(module)))

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 20 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

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

	var _redis = __webpack_require__(7);

	var _room_controller = __webpack_require__(13);

	var RoomController = _interopRequireWildcard(_room_controller);

	var _chat_controller = __webpack_require__(16);

	var ChatController = _interopRequireWildcard(_chat_controller);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

	var SocketIO = __webpack_require__(22);
	var socketioJwt = __webpack_require__(23);

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

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("socket.io");

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = require("socketio-jwt");

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = require("handlebars");

/***/ }
/******/ ]);