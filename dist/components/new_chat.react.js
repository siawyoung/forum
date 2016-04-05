"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Room = function Room(_ref) {
  var room = _ref.room;
  var index = _ref.index;
  var changeSelectedRoom = _ref.changeSelectedRoom;


  var lastMessage = room.messages[room.messages.length - 1];
  var message = lastMessage ? lastMessage.message : "";
  var user = lastMessage ? lastMessage.user : "";
  var timestamp = lastMessage ? lastMessage.timestamp : "";

  return React.createElement(
    "div",
    { className: "room flex", onClick: function onClick() {
        console.log('clicked', index);
        changeSelectedRoom(index);
      } },
    React.createElement(
      "div",
      { className: "user" },
      React.createElement("img", { src: "http://placehold.it/80x80", alt: "" })
    ),
    React.createElement(
      "div",
      { className: "info" },
      React.createElement(
        "div",
        { className: "roomName" },
        room.name
      ),
      React.createElement(
        "div",
        { className: "username" },
        user
      ),
      React.createElement(
        "div",
        { className: "last-message" },
        message
      ),
      React.createElement(
        "div",
        { className: "time-sent" },
        timestamp
      )
    )
  );
};

var RoomList = function RoomList(_ref2) {
  var rooms = _ref2.rooms;
  var changeSelectedRoom = _ref2.changeSelectedRoom;


  return React.createElement(
    "div",
    { id: "RoomList" },
    rooms.map(function (room, index) {
      return React.createElement(Room, { key: index, index: index, room: room, changeSelectedRoom: changeSelectedRoom });
    })
  );
};

var ChatBubble = function ChatBubble(_ref3) {
  var text = _ref3.text;


  var isSelf = text.user === store.get('forum:name') ? 'self' : 'other';
  return React.createElement(
    "div",
    { className: "chat-bubble " + isSelf },
    React.createElement(
      "div",
      { className: "chat-bubble-text" },
      text.message
    )
  );
};

var MessageList = function MessageList(_ref4) {
  var messages = _ref4.messages;

  console.log('messagelist', messages);
  return React.createElement(
    "div",
    { id: "MessageList" },
    messages.map(function (msg, index) {
      return React.createElement(ChatBubble, { key: index, text: msg });
    })
  );
};

// const ChatInput = ({
//   data
// }) => {
//   return (
//     <div id="ChatInput" className="faint-top-border">
//       <input type="text" />
//     </div>
//   )
// }

var ChatInput = function (_React$Component) {
  _inherits(ChatInput, _React$Component);

  function ChatInput() {
    _classCallCheck(this, ChatInput);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ChatInput).call(this));

    _this.sendMessage = function (e) {
      e.preventDefault();
      var _this$props = _this.props;
      var roomId = _this$props.roomId;
      var socket = _this$props.socket;

      var message = e.target.getElementsByClassName('message')[0].value;

      if (message) {
        socket.emit('messages:new', { roomId: roomId, message: message });
      }
    };

    return _this;
  }

  _createClass(ChatInput, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { id: "ChatInput", className: "faint-top-border" },
        React.createElement(
          "form",
          { onSubmit: this.sendMessage },
          React.createElement("input", { type: "text", className: "message" })
        )
      );
    }
  }]);

  return ChatInput;
}(React.Component);

var SearchBar = function (_React$Component2) {
  _inherits(SearchBar, _React$Component2);

  function SearchBar() {
    var _Object$getPrototypeO;

    var _temp, _this2, _ret;

    _classCallCheck(this, SearchBar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(SearchBar)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this2), _this2.createRoomHandler = function (e) {
      var socket = _this2.props.socket;

      socket.emit('rooms:create', {
        name: "" + Math.random().toString(36).slice(2),
        users: ['jason', 'adam']
      });
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(SearchBar, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { id: "SearchBar" },
        React.createElement("input", { type: "text", placeholder: "Search" }),
        React.createElement("i", {
          className: "fa fa-plus-square-o",
          id: "NewRoomButton",
          onClick: this.createRoomHandler
        })
      );
    }
  }]);

  return SearchBar;
}(React.Component);

var RoomTitle = function RoomTitle(_ref5) {
  var roomName = _ref5.roomName;

  return React.createElement(
    "div",
    { id: "RoomTitle", className: "faint-bottom-border" },
    roomName
  );
};

var TopBar = function TopBar(_ref6) {
  var data = _ref6.data;
  var socket = _ref6.socket;
  var roomName = _ref6.roomName;

  return React.createElement(
    "div",
    { id: "TopBar" },
    React.createElement(
      "div",
      { className: "one-third faint-right-border" },
      React.createElement(SearchBar, { socket: socket })
    ),
    React.createElement(
      "div",
      { className: "two-third" },
      React.createElement(RoomTitle, { data: data, roomName: roomName })
    )
  );
};

var ChatView = function (_React$Component3) {
  _inherits(ChatView, _React$Component3);

  function ChatView() {
    _classCallCheck(this, ChatView);

    var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(ChatView).call(this));

    _this3.changeSelectedRoom = function (id) {
      console.log('changeselectedroom', id);
      _this3.setState({ selectedRoom: id });
    };

    _this3.state = {
      selectedRoom: 0
    };
    return _this3;
  }

  _createClass(ChatView, [{
    key: "componentWillMount",
    value: function componentWillMount() {}
  }, {
    key: "render",
    value: function render() {

      var rooms = this.props.data.rooms;
      var selectedRoom = this.state.selectedRoom;

      var roomId = rooms.length > 0 ? rooms[selectedRoom].id : null;
      var messages = rooms.length > 0 ? rooms[selectedRoom].messages : [];
      var roomName = rooms.length > 0 ? rooms[selectedRoom].name : "";

      return React.createElement(
        "div",
        { id: "ChatView", className: "top-level" },
        React.createElement(TopBar, { data: this.props.data, socket: this.props.socket, roomName: roomName }),
        React.createElement(
          "div",
          { className: "one-third faint-right-border" },
          React.createElement(RoomList, { rooms: rooms, changeSelectedRoom: this.changeSelectedRoom })
        ),
        React.createElement(
          "div",
          { className: "two-third" },
          React.createElement(MessageList, { messages: messages }),
          React.createElement(ChatInput, { roomId: roomId, socket: this.props.socket })
        )
      );
    }
  }]);

  return ChatView;
}(React.Component);

// const parseJSONLoad = (payload) => {
//   return payload.map(x => JSON.parse(x))
// }

var renderView = function renderView(_ref7) {
  var data = _ref7.data;
  var socket = _ref7.socket;

  ReactDOM.render(React.createElement(ChatView, { data: data, socket: socket }), document.getElementById('root'));
};

var initialLoad = function initialLoad(_ref8) {
  var socket = _ref8.socket;
  var data = _ref8.data;

  renderView({ socket: socket, data: data });
};

var preprocessInitialMessages = function preprocessInitialMessages(res) {
  var ppRoom = res.rooms.map(function (room) {
    return _extends({}, room, {
      messages: room.messages.map(function (msg) {
        return JSON.parse(msg);
      })
    });
  });
  return _extends({}, res, {
    rooms: ppRoom
  });
};

$(document).ready(function () {
  var token = store.get('forum:token');

  if (!token) {
    window.location.replace('/login');
  }

  $.ajax('/load', {
    method: 'GET',
    headers: {
      'Authorization': "Bearer " + token
    },
    success: function success(response) {

      var data = preprocessInitialMessages(response);

      var socket = io.connect('http://localhost:8000');
      socket.on('connect', function () {
        socket.on('authenticated', function () {}).emit('authenticate', { token: token }); //send the jwt
      });

      socket.on('error', function (s) {
        console.log('error');
        console.log(s);
      });

      socket.on('rooms:created', function (msg) {
        data = _extends({}, data, {
          rooms: [msg].concat(_toConsumableArray(data.rooms))
        });
        initialLoad({ socket: socket, data: data });
      });

      socket.on('messages:new', function (msg) {
        var updatedRoom = data.rooms.filter(function (room) {
          return room.id === msg.roomId;
        })[0];
        updatedRoom.messages.push(msg.message);
        if (data.rooms.indexOf(updatedRoom) > 0) {
          data.rooms.splice(data.rooms.indexOf(updatedRoom), 1);
          data.rooms.unshift(updatedRoom);
        }
        initialLoad({ socket: socket, data: data });
      });

      initialLoad({ socket: socket, data: data });
    }
  });
});