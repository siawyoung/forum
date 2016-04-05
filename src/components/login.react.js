
class LoginForm extends React.Component {

  constructor() {
    super()
    this.state = {
      username: "",
      password: ""
    }
  }

  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value })
  }

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value })
  }

  handleFormSubmit = (e) => {
    e.preventDefault()
    $.post('/login', {
      username: e.target.getElementsByClassName('username')[0].value,
      password: e.target.getElementsByClassName('password')[0].value,
    }, (data) => {
      store.set('forum:token', data)
      window.location.replace('/')
    })
  }

  render() {
    return (
      <form id="LoginForm" onSubmit={this.handleFormSubmit}>

        <div className="form-group">
          <label>Username</label>
          <input
          className="username"
          type="text"
          onChange={this.handleUsernameChange}
           />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
          className="password"
          type="password"
          onChange={this.handlePasswordChange}
           />
        </div>

        <div className="form-group">
          <button type="submit">Sign in</button>
        </div>

      </form>
    )
  }
}

const LoginLinks = () => {
  return (
    <div id="LoginLinks">
      <div>
        <a href="#">forgot password</a>
      </div>
      <div>
        <a href="/register">new account</a>
      </div>
    </div>
  )
}

const LoginView = () => {
  return (
    <div id="LoginView">
      <div className="jumbo">
        Hello.
      </div>
      <LoginForm />
      <LoginLinks />
    </div>
  )
}

const renderView = (data) => {
  ReactDOM.render(
    <LoginView />,
    document.getElementById('root')
  )
}

$(document).ready(() => {
  renderView()
})