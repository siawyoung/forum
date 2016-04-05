
const getUser = (socket) => {
  let name = Cookies.get('name')
  if (!name || name === 'null') {
    name = window.prompt("What is your name/handle?")
    Cookies.set('name', name)
  }

  socket.emit('io:name', name)
  return name
}

class SearchBar extends React.Component {

  createRoomHandler = (e) => {
    const { socket } = this.props.state
    socket.emit('room:create', JSON.stringify({
      name: 'room1',
      users: ['jason', 'adam']
    }))
  }

  render() {
    return (
      <div id="SearchBar">
        <input type="text" placeholder="Search" />
        <i
        className="fa fa-plus-square-o"
        id="NewRoomButton"
        onClick={this.createRoomHandler}
        ></i>
      </div>
    )
  }
}

const RoomTitle = ({
  state
}) => {
  return (
    <div id="RoomTitle" className="faint-bottom-border">
      Somebody
    </div>
  )
}

const TopBar = ({ state }) => {
  return (
    <div id="TopBar">
      <div className="one-third faint-right-border">
        <SearchBar state={state} />
      </div>
      <div className="two-third">
        <RoomTitle state={state} />
      </div>
    </div>
  )
}

const Room = ({
  room
}) => {
  return (
    <div className="room flex">
      <div className="user">
        <img src="http://placehold.it/80x80" alt="" />
      </div>
      <div className="info">
        <div className="username">
          {room.user.name}
        </div>
        <div className="last-message">
          {room.lastMessage}
        </div>
        <div className="time-sent">
          {room.timeSent}
        </div>
      </div>
    </div>
  )
}

const RoomList = ({
  placeholder
}) => {

  const rooms = [
    {
      user: {
        name: "BB",
        profile: "something"
      },
      lastMessage: "This was my last message",
      timeSent: "7:30pm"
    },

    {
      user: {
        name: "Another",
        profile: "something"
      },
      lastMessage: "Another last message",
      timeSent: "7:30pm"
    },
  ]

  return (
    <div id="RoomList">
      {rooms.map((room, index) => (
        <Room key={index} room={room} />
      ))}
    </div>
  )
}

const ChatBubble = ({
  text
}) => {

  const isSelf = text.n === Cookies.get('name') ? 'self' : 'other'
  return (
  <div className={`chat-bubble ${isSelf}`}>
    <div className="chat-bubble-text">
      {text.m}
    </div>
  </div>
)}

const MessageList = ({ messages }) => {
  return (
    <div id="MessageList">
      {messages.map((msg, index) => (
        <ChatBubble key={index} text={msg} />
      ))}
    </div>
  )
}

const ChatInput = ({
  data
}) => {
  return (
    <div id="ChatInput" className="faint-top-border">
      <input type="text" />
    </div>
  )
}

const ChatView = ({ state }) => {
  return (
  <div id="ChatView" className="top-level">
    <TopBar state={state} />
    <div className="one-third faint-right-border">
      <RoomList />
    </div>
    <div className="two-third">
      <MessageList messages={parseJSONLoad(state.messages)} />
      <ChatInput />
    </div>
  </div>
)}

const parseJSONLoad = (payload) => {
  return payload.map(x => JSON.parse(x))
}

const renderView = (state) => {
  ReactDOM.render(
    <ChatView state={state} />,
    document.getElementById('root')
  )
}

const initialLoad = ({ socket }) => {
  $.ajax('/load', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.bG9s.plqu3wmup-JVrGjOt9bJIrM4Uf3th42qSnEjGCjSKiI`
    },
    success: (data) => {
      console.log(data)
    }
  })
  // $.ajax()
  renderView({ socket, messages: [] })
}

$(document).ready(() => {

  var socket = io.connect('http://localhost:8000')
  socket.on('connect', function () {
    socket.on('authenticated', () => {
      //do other things
    }).emit('authenticate', {token: 'eyJhbGciOiJIUzI1NiJ9.bG9s.plqu3wmup-JVrGjOt9bJIrM4Uf3th42qSnEjGCjSKiI'}) //send the jwt
  })

  socket.on('error', function(s) {
    console.log('error')
    console.log(s)
  })

  initialLoad({ socket })

})