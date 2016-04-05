
class RegisterForm extends React.Component {

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
    $.post('/register', {
      username: e.target.getElementsByClassName('username')[0].value,
      password: e.target.getElementsByClassName('password')[0].value,
    }, (data) => {
      window.location.replace('/login')
    })
  }

  render() {

    return (
      <form id="RegisterForm" onSubmit={this.handleFormSubmit}>

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
          <label>Emotion Avatar</label>
          <div id="emotion-avatar-buttons">
            <button id="upload">Upload</button>
            <button id="camera">Camera</button>
          </div>
        </div>

        <div className="form-group">
          <button type="submit">Create Account</button>
        </div>

      </form>
    )

  }
}

const RegisterView = () => {
  return (
    <div id="RegisterView">
      <RegisterForm />
    </div>
  )
}

const renderView = (data) => {
  ReactDOM.render(
    <RegisterView />,
    document.getElementById('root'),
  )
}

const attachFormHandler = () => {

}

$(document).ready(() => {
  renderView()
})