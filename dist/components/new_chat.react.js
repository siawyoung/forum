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

var ChatView = function ChatView(_ref) {
  var data = _ref.data;

  return React.createElement(
    'div',
    { id: 'chat-view' },
    data.map(function (msg, index) {
      return React.createElement(ChatBubble, { key: index, text: msg });
    }),
    React.createElement(ChatInput, null)
  );
};

var ChatBubble = function ChatBubble(_ref2) {
  var text = _ref2.text;


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
  return React.createElement('input', { type: 'text' });
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