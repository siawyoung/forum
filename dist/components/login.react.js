"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginForm = function (_React$Component) {
  _inherits(LoginForm, _React$Component);

  function LoginForm() {
    _classCallCheck(this, LoginForm);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LoginForm).call(this));

    _this.handleUsernameChange = function (e) {
      _this.setState({ username: e.target.value });
    };

    _this.handlePasswordChange = function (e) {
      _this.setState({ password: e.target.value });
    };

    _this.handleFormSubmit = function (e) {
      e.preventDefault();
      $.post('/login', {
        username: e.target.getElementsByClassName('username')[0].value,
        password: e.target.getElementsByClassName('password')[0].value
      }, function (data) {
        store.set('forum:token', data);
        window.location.replace('/');
      });
    };

    _this.state = {
      username: "",
      password: ""
    };
    return _this;
  }

  _createClass(LoginForm, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "form",
        { id: "LoginForm", onSubmit: this.handleFormSubmit },
        React.createElement(
          "div",
          { className: "form-group" },
          React.createElement(
            "label",
            null,
            "Username"
          ),
          React.createElement("input", {
            className: "username",
            type: "text",
            onChange: this.handleUsernameChange
          })
        ),
        React.createElement(
          "div",
          { className: "form-group" },
          React.createElement(
            "label",
            null,
            "Password"
          ),
          React.createElement("input", {
            className: "password",
            type: "password",
            onChange: this.handlePasswordChange
          })
        ),
        React.createElement(
          "div",
          { className: "form-group" },
          React.createElement(
            "button",
            { type: "submit" },
            "Sign in"
          )
        )
      );
    }
  }]);

  return LoginForm;
}(React.Component);

var LoginLinks = function LoginLinks() {
  return React.createElement(
    "div",
    { id: "LoginLinks" },
    React.createElement(
      "div",
      null,
      React.createElement(
        "a",
        { href: "#" },
        "forgot password"
      )
    ),
    React.createElement(
      "div",
      null,
      React.createElement(
        "a",
        { href: "/register" },
        "new account"
      )
    )
  );
};

var LoginView = function LoginView() {
  return React.createElement(
    "div",
    { id: "LoginView" },
    React.createElement(
      "div",
      { className: "jumbo" },
      "Hello."
    ),
    React.createElement(LoginForm, null),
    React.createElement(LoginLinks, null)
  );
};

var renderView = function renderView(data) {
  ReactDOM.render(React.createElement(LoginView, null), document.getElementById('root'));
};

$(document).ready(function () {
  renderView();
});