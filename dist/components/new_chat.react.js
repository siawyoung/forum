'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getUser = function getUser(socket) {
  var name = Cookies.get('name');
  if (!name || name === 'null') {
    name = window.prompt("What is your name/handle?");
    Cookies.set('name', name);
  }

  socket.emit('io:name', name);
  return name;
};

var SearchBar = function (_React$Component) {
  _inherits(SearchBar, _React$Component);

  function SearchBar() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, SearchBar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(SearchBar)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.createRoomHandler = function (e) {
      var socket = _this.props.state.socket;

      socket.emit('room:create', JSON.stringify({
        name: 'room1',
        users: ['jason', 'adam']
      }));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SearchBar, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { id: 'SearchBar' },
        React.createElement('input', { type: 'text', placeholder: 'Search' }),
        React.createElement('i', {
          className: 'fa fa-plus-square-o',
          id: 'NewRoomButton',
          onClick: this.createRoomHandler
        })
      );
    }
  }]);

  return SearchBar;
}(React.Component);

var RoomTitle = function RoomTitle(_ref) {
  var state = _ref.state;

  return React.createElement(
    'div',
    { id: 'RoomTitle', className: 'faint-bottom-border' },
    'Somebody'
  );
};

var TopBar = function TopBar(_ref2) {
  var state = _ref2.state;

  return React.createElement(
    'div',
    { id: 'TopBar' },
    React.createElement(
      'div',
      { className: 'one-third faint-right-border' },
      React.createElement(SearchBar, { state: state })
    ),
    React.createElement(
      'div',
      { className: 'two-third' },
      React.createElement(RoomTitle, { state: state })
    )
  );
};

var Room = function Room(_ref3) {
  var room = _ref3.room;

  return React.createElement(
    'div',
    { className: 'room flex' },
    React.createElement(
      'div',
      { className: 'user' },
      React.createElement('img', { src: 'http://placehold.it/80x80', alt: '' })
    ),
    React.createElement(
      'div',
      { className: 'info' },
      React.createElement(
        'div',
        { className: 'username' },
        room.user.name
      ),
      React.createElement(
        'div',
        { className: 'last-message' },
        room.lastMessage
      ),
      React.createElement(
        'div',
        { className: 'time-sent' },
        room.timeSent
      )
    )
  );
};

var RoomList = function RoomList(_ref4) {
  var placeholder = _ref4.placeholder;


  var rooms = [{
    user: {
      name: "BB",
      profile: "something"
    },
    lastMessage: "This was my last message",
    timeSent: "7:30pm"
  }, {
    user: {
      name: "Another",
      profile: "something"
    },
    lastMessage: "Another last message",
    timeSent: "7:30pm"
  }];

  return React.createElement(
    'div',
    { id: 'RoomList' },
    rooms.map(function (room, index) {
      return React.createElement(Room, { key: index, room: room });
    })
  );
};

var ChatBubble = function ChatBubble(_ref5) {
  var text = _ref5.text;


  var isSelf = text.n === Cookies.get('name') ? 'self' : 'other';
  return React.createElement(
    'div',
    { className: 'chat-bubble ' + isSelf },
    React.createElement(
      'div',
      { className: 'chat-bubble-text' },
      text.m
    )
  );
};

var MessageList = function MessageList(_ref6) {
  var messages = _ref6.messages;

  return React.createElement(
    'div',
    { id: 'MessageList' },
    messages.map(function (msg, index) {
      return React.createElement(ChatBubble, { key: index, text: msg });
    })
  );
};

var ChatInput = function ChatInput(_ref7) {
  var data = _ref7.data;

  return React.createElement(
    'div',
    { id: 'ChatInput', className: 'faint-top-border' },
    React.createElement('input', { type: 'text' })
  );
};

var ChatView = function ChatView(_ref8) {
  var state = _ref8.state;

  return React.createElement(
    'div',
    { id: 'ChatView', className: 'top-level' },
    React.createElement(TopBar, { state: state }),
    React.createElement(
      'div',
      { className: 'one-third faint-right-border' },
      React.createElement(RoomList, null)
    ),
    React.createElement(
      'div',
      { className: 'two-third' },
      React.createElement(MessageList, { messages: parseJSONLoad(state.messages) }),
      React.createElement(ChatInput, null)
    )
  );
};

var parseJSONLoad = function parseJSONLoad(payload) {
  return payload.map(function (x) {
    return JSON.parse(x);
  });
};

var renderView = function renderView(state) {
  ReactDOM.render(React.createElement(ChatView, { state: state }), document.getElementById('root'));
};

var initialLoad = function initialLoad(_ref9) {
  var socket = _ref9.socket;

  $.ajax('/load', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.bG9s.plqu3wmup-JVrGjOt9bJIrM4Uf3th42qSnEjGCjSKiI'
    },
    success: function success(data) {
      console.log(data);
    }
  });
  // $.ajax()
  renderView({ socket: socket, messages: [] });
};

$(document).ready(function () {

  var socket = io.connect('http://localhost:8000');
  socket.on('connect', function () {
    socket.on('authenticated', function () {
      //do other things
    }).emit('authenticate', { token: 'eyJhbGciOiJIUzI1NiJ9.bG9s.plqu3wmup-JVrGjOt9bJIrM4Uf3th42qSnEjGCjSKiI' }); //send the jwt
  });

  socket.on('error', function (s) {
    console.log('error');
    console.log(s);
  });

  initialLoad({ socket: socket });
});