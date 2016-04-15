"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var multiStreamRecorder = void 0,
    video = void 0;
var canUpload = true;

var NoWebcamModal = function NoWebcamModal() {
  return React.createElement(
    "div",
    { id: "NoWebcamModal", className: "avgrund-popup" },
    React.createElement(
      "h2",
      null,
      "No Webcam"
    ),
    React.createElement(
      "p",
      null,
      "Sorry, but there is no webcam support so creation of stickers is disabled."
    )
  );
};

var CreateRoomModal = function (_React$Component) {
  _inherits(CreateRoomModal, _React$Component);

  function CreateRoomModal() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, CreateRoomModal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(CreateRoomModal)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.createRoomHandler = function (e) {
      e.preventDefault();
      var socket = _this.props.socket;

      var roomname = e.target.getElementsByClassName('roomname')[0].value;
      var recipients = e.target.getElementsByClassName('recipients')[0].value.split(",");
      socket.emit('rooms:create', {
        name: roomname,
        users: recipients
      });
      closeDialog();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CreateRoomModal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      $(this.refs.recipients).tagsInput({
        width: 336,
        'defaultText': '',
        'removeWithBackspace': true
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { id: "CreateRoomModal", className: "avgrund-popup" },
        React.createElement(
          "h2",
          null,
          "New Room"
        ),
        React.createElement(
          "form",
          { onSubmit: this.createRoomHandler },
          React.createElement(
            "div",
            { className: "form-group" },
            React.createElement(
              "label",
              null,
              "Name of Room"
            ),
            React.createElement("input", { className: "roomname", type: "text" })
          ),
          React.createElement(
            "div",
            { className: "form-group" },
            React.createElement(
              "label",
              null,
              "Recipients"
            ),
            React.createElement("input", { className: "recipients", type: "text", ref: "recipients" })
          ),
          React.createElement(
            "div",
            { className: "form-group" },
            React.createElement(
              "button",
              { type: "submit" },
              "Create"
            )
          )
        )
      );
    }
  }]);

  return CreateRoomModal;
}(React.Component);

function timeToString(time) {
  if (!time) {
    return "";
  }
  return time.getHours() + ":" + time.getMinutes();
}

var Room = function Room(_ref) {
  var room = _ref.room;
  var index = _ref.index;
  var changeSelectedRoom = _ref.changeSelectedRoom;


  var lastMessage = room.messages[room.messages.length - 1];
  // const message = lastMessage ? lastMessage.message : ""

  var message = function message() {
    if (lastMessage && lastMessage.sticker) {
      return "Sticker";
    } else if (lastMessage) {
      return lastMessage.message;
    } else {
      return "";
    }
  };

  var user = lastMessage ? lastMessage.user : "";
  var timestamp = lastMessage ? new Date(lastMessage.timestamp) : "";

  return React.createElement(
    "div",
    { className: "room flex", onClick: function onClick() {
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
        message()
      ),
      React.createElement(
        "div",
        { className: "time-sent" },
        timeToString(timestamp)
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


  var renderMessage = function renderMessage(text) {
    if (text.sticker) {
      return React.createElement(
        "div",
        { className: "chat-bubble-sticker" },
        React.createElement("video", { src: text.video })
      );
    }

    return React.createElement(
      "div",
      { className: "chat-bubble-text" },
      text.message
    );
  };

  var isSelf = text.user === store.get('forum:name') ? 'self' : 'other';
  return React.createElement(
    "div",
    { className: "chat-bubble " + isSelf },
    renderMessage(text)
  );
};

var MessageList = function (_React$Component2) {
  _inherits(MessageList, _React$Component2);

  function MessageList() {
    _classCallCheck(this, MessageList);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MessageList).apply(this, arguments));
  }

  _createClass(MessageList, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var x = document.getElementById('MessageList');
      x.scrollTop = x.scrollHeight;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var x = document.getElementById('MessageList');
      x.scrollTop = x.scrollHeight;
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { id: "MessageList" },
        this.props.messages.map(function (msg, index) {
          return React.createElement(ChatBubble, { key: index, text: msg });
        })
      );
    }
  }]);

  return MessageList;
}(React.Component);

var ChatInput = function (_React$Component3) {
  _inherits(ChatInput, _React$Component3);

  function ChatInput() {
    _classCallCheck(this, ChatInput);

    var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(ChatInput).call(this));

    _this3.sendMessage = function (e) {
      e.preventDefault();
      var _this3$props = _this3.props;
      var roomId = _this3$props.roomId;
      var socket = _this3$props.socket;

      var message = e.target.getElementsByClassName('message')[0].value;

      if (message) {
        socket.emit('messages:new', { roomId: roomId, message: message });
        e.target.getElementsByClassName('message')[0].value = "";
      }
    };

    return _this3;
  }

  _createClass(ChatInput, [{
    key: "render",
    value: function render() {

      var toggleStickerPane = this.props.toggleStickerPane;

      return React.createElement(
        "div",
        { id: "ChatInput", className: "faint-top-border" },
        React.createElement("i", { id: "StickerButton", className: "fa fa-smile-o", onClick: function onClick() {
            toggleStickerPane(true);
          } }),
        React.createElement(
          "form",
          { onSubmit: this.sendMessage },
          React.createElement("input", { type: "text", className: "message" })
        ),
        React.createElement("i", { id: "SendButton", className: "fa fa-paper-plane" })
      );
    }
  }]);

  return ChatInput;
}(React.Component);

var SearchBar = function (_React$Component4) {
  _inherits(SearchBar, _React$Component4);

  function SearchBar() {
    var _Object$getPrototypeO2;

    var _temp2, _this4, _ret2;

    _classCallCheck(this, SearchBar);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this4 = _possibleConstructorReturn(this, (_Object$getPrototypeO2 = Object.getPrototypeOf(SearchBar)).call.apply(_Object$getPrototypeO2, [this].concat(args))), _this4), _this4.openCreateRoomModal = function () {
      Avgrund.show("#CreateRoomModal");
    }, _temp2), _possibleConstructorReturn(_this4, _ret2);
  }

  _createClass(SearchBar, [{
    key: "render",
    value: function render() {

      var toggleSidebar = this.props.toggleSidebar;

      return React.createElement(
        "div",
        { id: "SearchBar" },
        React.createElement("i", {
          className: "fa fa-arrow-left",
          id: "CloseSidebar",
          onClick: function onClick() {
            toggleSidebar(false);
          }
        }),
        React.createElement("i", {
          className: "fa fa-plus-square-o",
          id: "NewRoomButton",
          onClick: this.openCreateRoomModal
        })
      );
    }
  }]);

  return SearchBar;
}(React.Component);

var RoomTitle = function RoomTitle(_ref4) {
  var roomName = _ref4.roomName;
  var toggleSidebar = _ref4.toggleSidebar;

  return React.createElement(
    "div",
    { id: "RoomTitle", className: "faint-bottom-border" },
    React.createElement(
      "div",
      { className: "back-button" },
      React.createElement("i", { className: "fa fa-bars", onClick: function onClick() {
          toggleSidebar(true);
        } })
    ),
    roomName
  );
};

var CreateStickerModal = function (_React$Component5) {
  _inherits(CreateStickerModal, _React$Component5);

  function CreateStickerModal() {
    var _Object$getPrototypeO3;

    var _temp3, _this5, _ret3;

    _classCallCheck(this, CreateStickerModal);

    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return _ret3 = (_temp3 = (_this5 = _possibleConstructorReturn(this, (_Object$getPrototypeO3 = Object.getPrototypeOf(CreateStickerModal)).call.apply(_Object$getPrototypeO3, [this].concat(args))), _this5), _this5.createStickerHandler = function (e) {
      e.preventDefault();
    }, _temp3), _possibleConstructorReturn(_this5, _ret3);
  }

  _createClass(CreateStickerModal, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { id: "CreateStickerModal", className: "avgrund-popup" },
        React.createElement(
          "h2",
          null,
          "Add Sticker"
        ),
        React.createElement(
          "form",
          { onSubmit: this.createStickerHandler },
          React.createElement(
            "select",
            { defaultValue: "happy", id: "StickerEmotion" },
            React.createElement(
              "option",
              { value: "happy" },
              "Happy"
            ),
            React.createElement(
              "option",
              { value: "sad" },
              "Sad"
            ),
            React.createElement(
              "option",
              { value: "angry" },
              "Angry"
            ),
            React.createElement(
              "option",
              { value: "loving" },
              "Loving"
            ),
            React.createElement(
              "option",
              { value: "neutral" },
              "Neutral"
            )
          ),
          React.createElement(
            "button",
            { id: "StartRecordingSticker", type: "submit" },
            "Start Recording"
          )
        )
      );
    }
  }]);

  return CreateStickerModal;
}(React.Component);

var StickerPane = function (_React$Component6) {
  _inherits(StickerPane, _React$Component6);

  function StickerPane() {
    var _Object$getPrototypeO4;

    var _temp4, _this6, _ret4;

    _classCallCheck(this, StickerPane);

    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    return _ret4 = (_temp4 = (_this6 = _possibleConstructorReturn(this, (_Object$getPrototypeO4 = Object.getPrototypeOf(StickerPane)).call.apply(_Object$getPrototypeO4, [this].concat(args))), _this6), _this6.openCreateStickerModal = function () {
      $('#StartRecordingSticker').removeClass('Done');
      $('#StartRecordingSticker').removeClass('Recording');
      $('#StartRecordingSticker').html('Start Recording');
      if (navigator.getUserMedia) {

        video = document.createElement('video');

        navigator.getUserMedia({ audio: true, video: true }, function (stream) {
          multiStreamRecorder = new MultiStreamRecorder(stream);
          video = mergeProps(video, {
            controls: false,
            muted: true,
            src: URL.createObjectURL(stream)
          });

          var videoCallback = function videoCallback() {
            multiStreamRecorder.stream = stream;
            multiStreamRecorder.canvas = {
              width: video.width,
              height: video.height
            };

            multiStreamRecorder.video = video;

            multiStreamRecorder.ondataavailable = function (blobs) {
              canUpload = false;
              console.log("blob recorded");
              console.log("blobs", blobs);
              multiStreamRecorder.stop();
              video.pause();
              if (!canUpload) {
                console.log("uploading");
                $('#StartRecordingSticker').html('Sticker Created!');
                $('#StartRecordingSticker').removeClass('Recording');
                $('#StartRecordingSticker').addClass('Done');
                setTimeout(function () {
                  Avgrund.hide("#CreateStickerModal");
                }, 1000);
                uploadSticker(blobs, $('#StickerEmotion').val());
              }
            };

            $('#StartRecordingSticker').click(function () {
              console.log("recording started");
              $('#StartRecordingSticker').html('Recording...');
              $('#StartRecordingSticker').addClass('Recording');
              canUpload = true;
              multiStreamRecorder.start(5000);
            });
          };

          video.removeEventListener('loadedmetadata', videoCallback);
          video.addEventListener('loadedmetadata', videoCallback);

          $('#CreateStickerModal form').prepend(video);
          video.play();

          Avgrund.show("#CreateStickerModal");
        }, function () {
          Avgrund.show("#NoWebcamModal");
        });
      } else {
        Avgrund.show("#NoWebcamModal");
      }
    }, _this6.sendSticker = function (emotion) {
      if (_this6.props.stickers[emotion]) {
        var _this6$props = _this6.props;
        var roomId = _this6$props.roomId;
        var socket = _this6$props.socket;

        socket.emit('stickers:new', { roomId: roomId, emotion: emotion });
      }
    }, _temp4), _possibleConstructorReturn(_this6, _ret4);
  }

  _createClass(StickerPane, [{
    key: "render",
    value: function render() {
      var _this7 = this;

      var renderSticker = function renderSticker(emotion) {

        if (!_this7.props.stickers) {
          return React.createElement("img", { src: "http://placehold.it/115x90", alt: "" });
        }

        return _this7.props.stickers[emotion] ? React.createElement("video", { src: _this7.props.stickers[emotion].video }) : React.createElement("img", { src: "http://placehold.it/115x90", alt: "" });
      };

      var sendSticker = this.sendSticker;
      var toggleStickerPane = this.props.toggleStickerPane;
      var isOpen = this.props.isOpen ? "StickerPaneOpen" : "";

      return React.createElement(
        "div",
        { className: "StickerPane " + isOpen },
        React.createElement(
          "div",
          { id: "CloseStickerPaneDiv" },
          React.createElement("i", { id: "CloseStickerPane", className: "fa fa-times", onClick: function onClick() {
              toggleStickerPane(false);
            } })
        ),
        React.createElement(
          "div",
          { id: "StickerList" },
          React.createElement(
            "div",
            { id: "happySticker", onClick: function onClick() {
                sendSticker('happy');
              } },
            renderSticker('happy')
          ),
          React.createElement(
            "div",
            { id: "sadSticker", onClick: function onClick() {
                sendSticker('sad');
              } },
            renderSticker('sad')
          ),
          React.createElement(
            "div",
            { id: "angrySticker", onClick: function onClick() {
                sendSticker('angry');
              } },
            renderSticker('angry')
          ),
          React.createElement(
            "div",
            { id: "lovingSticker", onClick: function onClick() {
                sendSticker('loving');
              } },
            renderSticker('loving')
          ),
          React.createElement(
            "div",
            { id: "neutralSticker", onClick: function onClick() {
                sendSticker('neutral');
              } },
            renderSticker('neutral')
          )
        ),
        React.createElement(
          "button",
          { type: "submit", id: "CreateStickerButton", onClick: this.openCreateStickerModal },
          "Create Sticker"
        )
      );
    }
  }]);

  return StickerPane;
}(React.Component);

var ChatView = function (_React$Component7) {
  _inherits(ChatView, _React$Component7);

  function ChatView() {
    _classCallCheck(this, ChatView);

    var _this8 = _possibleConstructorReturn(this, Object.getPrototypeOf(ChatView).call(this));

    _this8.changeSelectedRoom = function (id) {
      _this8.setState({ selectedRoom: id });
    };

    _this8.toggleSidebar = function (s) {
      _this8.setState({ sidebarOpen: s });
    };

    _this8.toggleStickerPane = function (s) {
      _this8.setState({ stickerPaneOpen: s });
    };

    _this8.state = {
      selectedRoom: 0,
      sidebarOpen: false,
      stickerPaneOpen: false
    };
    return _this8;
  }

  _createClass(ChatView, [{
    key: "render",
    value: function render() {

      var stickers = this.props.data.stickers;

      var rooms = this.props.data.rooms;
      var selectedRoom = this.state.selectedRoom;

      var roomId = rooms.length > 0 ? rooms[selectedRoom].id : null;
      var messages = rooms.length > 0 ? rooms[selectedRoom].messages : [];
      var roomName = rooms.length > 0 ? rooms[selectedRoom].name : "";
      var roomColor = rooms.length > 0 ? rooms[selectedRoom].color : '#333333';

      var sideOpen = this.state.sidebarOpen ? "sidebarOpen" : "";

      return React.createElement(
        "div",
        { id: "ChatView", className: "top-level", style: { background: roomColor } },
        React.createElement(
          "div",
          { className: "sidebar faint-right-border " + sideOpen },
          React.createElement(SearchBar, { toggleSidebar: this.toggleSidebar }),
          React.createElement(RoomList, { rooms: rooms, changeSelectedRoom: this.changeSelectedRoom })
        ),
        React.createElement(
          "div",
          { className: "main-body" },
          React.createElement(RoomTitle, { toggleSidebar: this.toggleSidebar, roomName: roomName }),
          React.createElement(MessageList, { messages: messages }),
          React.createElement(ChatInput, { roomId: roomId, socket: this.props.socket, toggleStickerPane: this.toggleStickerPane }),
          React.createElement(StickerPane, { roomId: roomId, socket: this.props.socket, stickers: stickers, isOpen: this.state.stickerPaneOpen, toggleStickerPane: this.toggleStickerPane })
        ),
        React.createElement(NoWebcamModal, null),
        React.createElement(CreateStickerModal, { socket: this.props.socket }),
        React.createElement(CreateRoomModal, { socket: this.props.socket }),
        React.createElement("div", { className: "avgrund-cover" })
      );
    }
  }]);

  return ChatView;
}(React.Component);

// const parseJSONLoad = (payload) => {
//   return payload.map(x => JSON.parse(x))
// }

var renderView = function renderView(_ref5) {
  var data = _ref5.data;
  var socket = _ref5.socket;

  ReactDOM.render(React.createElement(ChatView, { data: data, socket: socket }), document.getElementById('root'));
};

var initialLoad = function initialLoad(_ref6) {
  var socket = _ref6.socket;
  var data = _ref6.data;

  renderView({ socket: socket, data: data });
};

function closeDialog() {
  Avgrund.hide();
}

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

      var data = response;

      if (!data.stickers) {
        data.stickers = {};
      }

      var socket = io.connect();
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
        updatedRoom.color = msg.color;
        updatedRoom.messages.push(msg.message);
        if (data.rooms.indexOf(updatedRoom) > 0) {
          data.rooms.splice(data.rooms.indexOf(updatedRoom), 1);
          data.rooms.unshift(updatedRoom);
        }
        initialLoad({ socket: socket, data: data });

        if (msg.message.sticker) {
          play(msg);
        }
      });

      socket.on('stickers:new', function (msg) {
        data['stickers'][msg['emotion']] = {
          audio: msg.audio,
          video: msg.video
        };
        initialLoad({ socket: socket, data: data });
      });

      initialLoad({ socket: socket, data: data });
    }
  });
});

function play(msg) {
  var audioTag = document.getElementById('sound');
  audioTag.src = msg.message.audio;
  audioTag.play();
}

function uploadSticker(blob, emotion) {

  var token = store.get('forum:token');
  var form = new FormData();

  form.append('video', blob.video);
  form.append('audio', blob.audio);
  form.append('emotion', emotion || 'happy');

  $.ajax('/stickers', {
    method: 'POST',
    headers: {
      'Authorization': "Bearer " + token
    },
    data: form,
    contentType: false,
    processData: false,
    success: function success() {
      console.log("successfully uploaded");
    }
  });
}