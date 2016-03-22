"use strict";

var Header = function Header() {
  return React.createElement(
    "div",
    { id: "header" },
    React.createElement(
      "div",
      { id: "headerText", className: "text" },
      "forum"
    )
  );
};

var NewMessage = function NewMessage() {
  return React.createElement(
    "div",
    { id: "newMessage" },
    React.createElement(
      "div",
      { id: "newMessageText", className: "text" },
      "new message"
    )
  );
};

var Chat = function Chat() {
  return React.createElement(
    "div",
    { className: "chat" },
    React.createElement(
      "h1",
      null,
      "LOL"
    )
  );
};

ReactDOM.render(React.createElement(
  "div",
  null,
  React.createElement(Header, null),
  React.createElement(NewMessage, null),
  React.createElement(Chat, null),
  React.createElement(Chat, null)
), document.getElementById('root'));