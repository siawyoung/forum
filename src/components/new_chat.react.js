
const Room = ({
  room,
  index,
  changeSelectedRoom
}) => {

  const lastMessage = room.messages[room.messages.length - 1]
  const message = lastMessage ? lastMessage.message : ""
  const user    = lastMessage ? lastMessage.user : ""
  const timestamp = lastMessage ? lastMessage.timestamp : ""

  return (
    <div className="room flex" onClick={function() {
    console.log('clicked')
    console.log(index)
    changeSelectedRoom(index) }}>
      <div className="user">
        <img src="http://placehold.it/80x80" alt="" />
      </div>
      <div className="info">
        <div className="roomName">
          {room.name}
        </div>
        <div className="username">
          {user}
        </div>
        <div className="last-message">
          {message}
        </div>
        <div className="time-sent">
          {timestamp}
        </div>
      </div>
    </div>
  )
}

const RoomList = ({ rooms, changeSelectedRoom }) => {

  return (
    <div id="RoomList">
      {rooms.map((room, index) => (
        <Room key={index} index={index} room={room} changeSelectedRoom={changeSelectedRoom} />
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

class SearchBar extends React.Component {

  createRoomHandler = (e) => {
    const { socket } = this.props
    socket.emit('room:create', JSON.stringify({
      name: 'room3',
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
  roomName
}) => {
  return (
    <div id="RoomTitle" className="faint-bottom-border">
      {roomName}
    </div>
  )
}

const TopBar = ({ data, socket, roomName }) => {
  return (
    <div id="TopBar">
      <div className="one-third faint-right-border">
        <SearchBar socket={socket} />
      </div>
      <div className="two-third">
        <RoomTitle data={data} roomName={roomName} />
      </div>
    </div>
  )
}

class ChatView extends React.Component {

  constructor() {
    super()
    this.state = {
      selectedRoom: 0
    }
  }

  componentWillMount() {

  }

  changeSelectedRoom = (id) => {
    console.log('changeselectedroom')
    console.log(id)
    this.setState({ selectedRoom: id })
  }

  render() {

    const rooms = this.props.data.rooms
    const selectedRoom = this.state.selectedRoom

    const messages = rooms.length > 0 ? rooms[selectedRoom].messages : []
    const roomName = rooms.length > 0 ? rooms[selectedRoom].name : ""

    return (
      <div id="ChatView" className="top-level">
        <TopBar data={this.props.data} socket={this.props.socket} roomName={roomName} />
        <div className="one-third faint-right-border">
          <RoomList rooms={rooms} changeSelectedRoom={this.changeSelectedRoom} />
        </div>
        <div className="two-third">
          <MessageList messages={messages} />
          <ChatInput />
        </div>
      </div>
    )
  }
}

// const parseJSONLoad = (payload) => {
//   return payload.map(x => JSON.parse(x))
// }

const renderView = ({ data, socket }) => {
  ReactDOM.render(
    <ChatView data={data} socket={socket} />,
    document.getElementById('root')
  )
}

const initialLoad = ({ socket, data }) => {
  renderView({ socket, data })
}

$(document).ready(() => {
  const token = store.get('forum:token')

  if (!token) {
    window.location.replace('/login')
  }

  $.ajax('/load', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    success: (response) => {

      let data = response

      var socket = io.connect('http://localhost:8000')
      socket.on('connect', function () {
        socket.on('authenticated', () => {
        }).emit('authenticate', { token }) //send the jwt
      })

      socket.on('error', function(s) {
        console.log('error')
        console.log(s)
      })

      socket.on('rooms:created', function(msg) {
        data = {
          ...data,
          rooms: [msg, ...data.rooms]
        }
        console.log(data)
        initialLoad({ socket, data })
      })

      console.log(data)

      initialLoad({ socket, data })

    }
  })
})
