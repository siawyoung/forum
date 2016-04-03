'use strict';

var getUser = function getUser(socket) {
  var name = Cookies.get('name');
  if (!name || name === 'null') {
    name = window.prompt("What is your name/handle?");
    Cookies.set('name', name);
  }

  socket.emit('io:name', name);
  return name;
};

var SearchBar = function SearchBar(_ref) {
  var something = _ref.something;

  return React.createElement(
    'div',
    { id: 'SearchBar' },
    React.createElement('input', { type: 'text', placeholder: 'Search' })
  );
};

var RoomTitle = function RoomTitle(_ref2) {
  var something = _ref2.something;

  return React.createElement(
    'div',
    { id: 'RoomTitle' },
    'Somebody'
  );
};

var TopBar = function TopBar(_ref3) {
  var placeholder = _ref3.placeholder;

  return React.createElement(
    'div',
    { id: 'TopBar' },
    React.createElement(
      'div',
      { className: 'one-third faint-right-border' },
      React.createElement(SearchBar, null)
    ),
    React.createElement(
      'div',
      { className: 'two-third' },
      React.createElement(RoomTitle, null)
    )
  );
};

var Room = function Room(_ref4) {
  var room = _ref4.room;

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

var RoomList = function RoomList(_ref5) {
  var placeholder = _ref5.placeholder;


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

var MessageList = function MessageList(_ref6) {
  var data = _ref6.data;

  return React.createElement(
    'div',
    { id: 'MessageList' },
    data.map(function (msg, index) {
      return React.createElement(ChatBubble, { key: index, text: msg });
    })
  );
};

var ChatView = function ChatView(_ref7) {
  var data = _ref7.data;

  return React.createElement(
    'div',
    { id: 'ChatView', className: 'top-level' },
    React.createElement(TopBar, null),
    React.createElement(
      'div',
      { className: 'one-third faint-right-border' },
      React.createElement(RoomList, null)
    ),
    React.createElement(
      'div',
      { className: 'two-third' },
      React.createElement(MessageList, { data: data }),
      React.createElement(ChatInput, null)
    )
  );
};

var ChatBubble = function ChatBubble(_ref8) {
  var text = _ref8.text;


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

var ChatInput = function ChatInput(_ref9) {
  var data = _ref9.data;

  return React.createElement(
    'div',
    { id: 'ChatInput', className: 'faint-top-border' },
    React.createElement('input', { type: 'text' })
  );
};

var parseJSONLoad = function parseJSONLoad(payload) {
  return payload.map(function (x) {
    return JSON.parse(x);
  });
};

var renderView = function renderView(data) {
  ReactDOM.render(React.createElement(ChatView, { data: parseJSONLoad(data) }), document.getElementById('root'));
};

var initialLoad = function initialLoad() {
  $.get('/load', function (data) {
    renderView(data);
  });
};

$(document).ready(function () {
  var socket = io();
  getUser(socket);

  initialLoad();
});