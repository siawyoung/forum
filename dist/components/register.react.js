"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RegisterForm = function (_React$Component) {
  _inherits(RegisterForm, _React$Component);

  function RegisterForm() {
    _classCallCheck(this, RegisterForm);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RegisterForm).call(this));

    _this.handleUsernameChange = function (e) {
      _this.setState({ username: e.target.value });
    };

    _this.handlePasswordChange = function (e) {
      _this.setState({ password: e.target.value });
    };

    _this.handleFormSubmit = function (e) {
      e.preventDefault();
      $.post('/register', {
        username: e.target.getElementsByClassName('username')[0].value,
        password: e.target.getElementsByClassName('password')[0].value
      }, function (data) {
        window.location.replace('/login');
      });
    };

    _this.state = {
      username: "",
      password: ""
    };
    return _this;
  }

  _createClass(RegisterForm, [{
    key: "render",
    value: function render() {

      return React.createElement(
        "form",
        { id: "RegisterForm", onSubmit: this.handleFormSubmit },
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
            "label",
            null,
            "Emotion Avatar"
          ),
          React.createElement(
            "div",
            { id: "emotion-avatar-buttons" },
            React.createElement(
              "button",
              { id: "upload" },
              "Upload"
            ),
            React.createElement(
              "button",
              { id: "camera" },
              "Camera"
            )
          )
        ),
        React.createElement(
          "div",
          { className: "form-group" },
          React.createElement(
            "button",
            { type: "submit" },
            "Create Account"
          )
        )
      );
    }
  }]);

  return RegisterForm;
}(React.Component);

var RegisterView = function RegisterView() {
  return React.createElement(
    "div",
    { id: "RegisterView" },
    React.createElement(RegisterForm, null)
  );
};

var renderView = function renderView(data) {
  ReactDOM.render(React.createElement(RegisterView, null), document.getElementById('root'));
};

var attachFormHandler = function attachFormHandler() {};

$(document).ready(function () {
  renderView();
});