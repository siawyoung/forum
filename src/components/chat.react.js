
class CreateRoomModal extends React.Component {

  componentDidMount() {
    $(this.refs.recipients).tagsInput({
      width: 336,
      'defaultText': '',
      'removeWithBackspace' : true
    })
  }

  createRoomHandler = (e) => {
    e.preventDefault()
    const { socket } = this.props
    const roomname = e.target.getElementsByClassName('roomname')[0].value
    const recipients = e.target.getElementsByClassName('recipients')[0].value.split(",")
    socket.emit('rooms:create', {
      name: roomname,
      users: recipients
    })
    closeDialog()
  }

  render() {
    return (
      <div id="CreateRoomModal" className="avgrund-popup">

        <h2>New Room</h2>

        <form onSubmit={this.createRoomHandler}>
          <div className="form-group">
            <label>Name of Room</label>
            <input className="roomname" type="text"/>
          </div>

          <div className="form-group">
            <label>Recipients</label>
            <input className="recipients" type="text" ref="recipients" />
          </div>

          <div className="form-group">
            <button type="submit">Create</button>
          </div>

        </form>

      </div>
    )
  }
}

function timeToString(time) {
  if (!time) {
    return ""
  }
  return `${time.getHours()}:${time.getMinutes()}`
}

const Room = ({
  room,
  index,
  changeSelectedRoom
}) => {

  const lastMessage = room.messages[room.messages.length - 1]
  const message = lastMessage ? lastMessage.message : ""
  const user    = lastMessage ? lastMessage.user : ""
  const timestamp = lastMessage ? new Date(lastMessage.timestamp) : ""

  return (
    <div className="room flex" onClick={function() {
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
          {timeToString(timestamp)}
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

  const isSelf = text.user === store.get('forum:name') ? 'self' : 'other'
  return (
  <div className={`chat-bubble ${isSelf}`}>
    <div className="chat-bubble-text">
      {text.message}
    </div>
  </div>
)}

class MessageList extends React.Component {

  componentDidUpdate() {
    const x = document.getElementById('MessageList')
    x.scrollTop = x.scrollHeight
  }

  componentDidMount() {
    const x = document.getElementById('MessageList')
    x.scrollTop = x.scrollHeight
  }

  render() {
    return (
      <div id="MessageList">
        {this.props.messages.map((msg, index) => (
          <ChatBubble key={index} text={msg} />
        ))}
      </div>
    )
  }
}

class ChatInput extends React.Component {
  constructor() {
    super()
  }

  sendMessage = (e) => {
    e.preventDefault()
    const { roomId, socket } = this.props
    const message = e.target.getElementsByClassName('message')[0].value

    if (message) {
      socket.emit('messages:new', { roomId, message })
      e.target.getElementsByClassName('message')[0].value = ""
    }
  }

  render() {
    return (
      <div id="ChatInput" className="faint-top-border">
        <i id="StickerButton" className="fa fa-smile-o"></i>
        <form onSubmit={this.sendMessage}>
          <input type="text" className="message" />
        </form>
        <i id="SendButton" className="fa fa-paper-plane"></i>
      </div>
    )
  }
}

class SearchBar extends React.Component {

  openCreateRoomModal = () => {
    Avgrund.show( "#CreateRoomModal" );
  }

  render() {

    const toggleSidebar = this.props.toggleSidebar

    return (
      <div id="SearchBar">
        {/*<input type="text" placeholder="Search" />*/}
        <i
        className="fa fa-arrow-left"
        id="CloseSidebar"
        onClick={function() { toggleSidebar(false) }}
        ></i>
        <i
        className="fa fa-plus-square-o"
        id="NewRoomButton"
        onClick={this.openCreateRoomModal}
        ></i>
      </div>
    )
  }
}

const RoomTitle = ({
  roomName,
  toggleSidebar
}) => {
  return (
    <div id="RoomTitle" className="faint-bottom-border">
      <div className="back-button">
        <i className="fa fa-bars" onClick={function() { toggleSidebar(true) }}></i>
      </div>
      {roomName}
    </div>
  )
}

class ChatView extends React.Component {

  constructor() {
    super()
    this.state = {
      selectedRoom: 0,
      sidebarOpen: false
    }
  }

  changeSelectedRoom = (id) => {
    console.log('changeselectedroom', id)
    this.setState({ selectedRoom: id })
  }

  toggleSidebar = (s) => {
    this.setState({ sidebarOpen: s })
  }

  render() {

    const rooms = this.props.data.rooms
    const selectedRoom = this.state.selectedRoom

    const roomId   = rooms.length > 0 ? rooms[selectedRoom].id : null
    const messages = rooms.length > 0 ? rooms[selectedRoom].messages : []
    const roomName = rooms.length > 0 ? rooms[selectedRoom].name : ""
    const roomColor = rooms.length > 0 ? rooms[selectedRoom].color : '#333333'

    const sideOpen = this.state.sidebarOpen ? "sidebarOpen" : ""

    return (
      <div id="ChatView" className="top-level" style={{ background: roomColor }}>
        <div className={`sidebar faint-right-border ${sideOpen}`}>
          <SearchBar toggleSidebar={this.toggleSidebar} />
          <RoomList rooms={rooms} changeSelectedRoom={this.changeSelectedRoom} />
        </div>
        <div className="main-body">
          <RoomTitle toggleSidebar={this.toggleSidebar} roomName={roomName} />
          <MessageList messages={messages} />
          <ChatInput roomId={roomId} socket={this.props.socket} />
        </div>
        <CreateRoomModal socket={this.props.socket} />
        <div className="avgrund-cover"></div>
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

const preprocessInitialMessages = (res) => {
  const ppRoom = res.rooms.map(room => {
    return {
      ...room,
      messages: room.messages.map(msg => {
        return JSON.parse(msg)
      })
    }
  })
  return {
    ...res,
    rooms: ppRoom
  }
}

function closeDialog() {
  Avgrund.hide();
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

      let data = preprocessInitialMessages(response)

      var socket = io.connect()
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
        initialLoad({ socket, data })
      })

      socket.on('messages:new', function(msg) {
        const updatedRoom = data.rooms.filter(room => {
          return room.id === msg.roomId
        })[0]
        updatedRoom.color = msg.color
        updatedRoom.messages.push(msg.message)
        if (data.rooms.indexOf(updatedRoom) > 0) {
          data.rooms.splice(data.rooms.indexOf(updatedRoom), 1)
          data.rooms.unshift(updatedRoom)
        }
        initialLoad({ socket, data })
      })

      initialLoad({ socket, data })

    }
  })
})
