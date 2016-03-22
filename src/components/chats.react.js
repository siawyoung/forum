
const Header = () => (
  <div id="header">
    <div id="headerText" className="text">forum</div>
  </div>
)

const NewMessage = () => (
  <div id="newMessage">
    <div id="newMessageText" className="text">new message</div>
  </div>
)

const Chat = () => (
  <div className="chat">
    <h1>LOL</h1>
  </div>
)

ReactDOM.render(
  <div>
    <Header />
    <NewMessage />
    <Chat />
    <Chat />
  </div>,
  document.getElementById('root')
)