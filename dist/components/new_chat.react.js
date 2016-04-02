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

var Room = function Room(_ref) {
  var room = _ref.room;

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

var RoomList = function RoomList(_ref2) {
  var placeholder = _ref2.placeholder;


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
    { id: 'RoomList', className: 'one-third' },
    rooms.map(function (room, index) {
      return React.createElement(Room, { key: index, room: room });
    })
  );
};

var MessageList = function MessageList(_ref3) {
  var data = _ref3.data;

  return React.createElement(
    'div',
    { id: 'MessageList' },
    data.map(function (msg, index) {
      return React.createElement(ChatBubble, { key: index, text: msg });
    })
  );
};

var ChatView = function ChatView(_ref4) {
  var data = _ref4.data;

  return React.createElement(
    'div',
    { id: 'ChatView', className: 'top-level' },
    React.createElement(RoomList, null),
    React.createElement(
      'div',
      { className: 'two-third' },
      React.createElement(MessageList, { data: data }),
      React.createElement(ChatInput, null)
    )
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

var ChatInput = function ChatInput() {
  return React.createElement(
    'div',
    { id: 'ChatInput' },
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