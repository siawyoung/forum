
let multiStreamRecorder, video

const NoWebcamModal = () => (
  <div id="NoWebcamModal" className="avgrund-popup">
    <h2>No Webcam</h2>
    <p>Sorry, but there is no webcam support so creation of stickers is disabled.</p>
  </div>
)

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
  // const message = lastMessage ? lastMessage.message : ""

  const message = () => {
    if (lastMessage && lastMessage.sticker) {
      return "Sticker"
    } else if (lastMessage) {
      return lastMessage.message
    } else {
      return ""
    }
  }

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
          {message()}
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

  const renderMessage = (text) => {
    if (text.sticker) {
      return (
        <div className="chat-bubble-sticker">
          <video src={text.video}></video>
        </div>
      )
    }

    return (
      <div className="chat-bubble-text">
        {text.message}
      </div>
    )
  }


  const isSelf = text.user === store.get('forum:name') ? 'self' : 'other'
  return (
  <div className={`chat-bubble ${isSelf}`}>
    {renderMessage(text)}
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

    const toggleStickerPane = this.props.toggleStickerPane

    return (
      <div id="ChatInput" className="faint-top-border">
        <i id="StickerButton" className="fa fa-smile-o" onClick={function() {toggleStickerPane(true)}}></i>
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

class CreateStickerModal extends React.Component {

  createStickerHandler = (e) => {
    e.preventDefault()

  }

  render() {
    return (
      <div id="CreateStickerModal" className="avgrund-popup">
        <h2>Add Sticker</h2>
        <form onSubmit={this.createStickerHandler}>
          <select defaultValue="happy" id="StickerEmotion">
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="angry">Angry</option>
            <option value="loving">Loving</option>
            <option value="neutral">Neutral</option>
          </select>
          <button id="StartRecordingSticker" type="submit">Start Recording</button>
        </form>
      </div>
    )
  }
}

class StickerPane extends React.Component {

  openCreateStickerModal = () => {

    if (navigator.getUserMedia) {

      video = document.createElement('video')

      navigator.getUserMedia({ audio: true, video: true }, (stream) => {
        multiStreamRecorder = new MultiStreamRecorder(stream)
        video = mergeProps(video, {
            controls: true,
            muted: true,
            src: URL.createObjectURL(stream)
        })

        const videoCallback = () => {
          multiStreamRecorder.stream = stream
          multiStreamRecorder.canvas = {
            width: video.width,
            height: video.height
          }

          multiStreamRecorder.video = video

          multiStreamRecorder.ondataavailable = (blobs) => {
            console.log(`blob recorded`)
            console.log(`blobs`, blobs)
            multiStreamRecorder.stop()
            video.pause()
            uploadSticker(blobs, $('#StickerEmotion').val())
          }

          $('#StartRecordingSticker').click(() => {
            console.log(`recording started`)
            multiStreamRecorder.start(5000)
          })
        }

        video.removeEventListener('loadedmetadata', videoCallback)
        video.addEventListener('loadedmetadata', videoCallback)

        $('#CreateStickerModal form').prepend(video)
        video.play()

        Avgrund.show( "#CreateStickerModal" )

      }, () => { Avgrund.show( "#NoWebcamModal" ) })
    } else {
      Avgrund.show( "#NoWebcamModal" )
    }

  }

  sendSticker = (emotion) => {
    if (this.props.stickers[emotion]) {
      const { roomId, socket } = this.props
      socket.emit('stickers:new', { roomId, emotion })
    }
  }

  render() {

    const renderSticker = (emotion) => {

      if (!this.props.stickers) {
        return (<img src="http://placehold.it/115x90" alt=""/>)
      }

      return this.props.stickers[emotion] ? (
        <video src={this.props.stickers[emotion].video}></video>
      ) : (
        <img src="http://placehold.it/115x90" alt=""/>
      )
    }

    const sendSticker = this.sendSticker
    const toggleStickerPane = this.props.toggleStickerPane
    const isOpen = this.props.isOpen ? "StickerPaneOpen" : ""

    return(
      <div className={`StickerPane ${isOpen}`}>
        <div id="CloseStickerPaneDiv">
          <i id="CloseStickerPane" className="fa fa-times" onClick={function() {toggleStickerPane(false)}}></i>
        </div>
        <div id="StickerList">
          <div id="happySticker" onClick={function() {sendSticker('happy')}}>
            {renderSticker('happy')}
          </div>
          <div id="sadSticker" onClick={function() {sendSticker('sad')}}>
            {renderSticker('sad')}
          </div>
          <div id="angrySticker" onClick={function() {sendSticker('angry')}}>
            {renderSticker('angry')}
          </div>
          <div id="lovingSticker" onClick={function() {sendSticker('loving')}}>
            {renderSticker('loving')}
          </div>
          <div id="neutralSticker" onClick={function() {sendSticker('neutral')}}>
            {renderSticker('neutral')}
          </div>
        </div>
        <button type="submit" id="CreateStickerButton" onClick={this.openCreateStickerModal}>Create Sticker</button>
      </div>
    )
  }
}

class ChatView extends React.Component {

  constructor() {
    super()
    this.state = {
      selectedRoom: 0,
      sidebarOpen: false,
      stickerPaneOpen: false
    }
  }

  changeSelectedRoom = (id) => {
    this.setState({ selectedRoom: id })
  }

  toggleSidebar = (s) => {
    this.setState({ sidebarOpen: s })
  }

  toggleStickerPane = (s) => {
    this.setState({ stickerPaneOpen: s })
  }

  render() {

    const stickers = this.props.data.stickers

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
          <ChatInput roomId={roomId} socket={this.props.socket} toggleStickerPane={this.toggleStickerPane} />
          <StickerPane roomId={roomId} socket={this.props.socket} stickers={stickers} isOpen={this.state.stickerPaneOpen} toggleStickerPane={this.toggleStickerPane} />
        </div>
        <NoWebcamModal />
        <CreateStickerModal socket={this.props.socket} />
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

      let data = response

      if (!data.stickers) {
        data.stickers = {}
      }

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

        if (msg.message.sticker) {
          play(msg)
        }
      })

      socket.on('stickers:new', function(msg) {
        data['stickers'][msg['emotion']] = {
          audio: msg.audio,
          video: msg.video
        }
        initialLoad({ socket, data })
      })

      initialLoad({ socket, data })

    }
  })
})

function play(msg) {
  const audioTag = document.getElementById('sound')
  audioTag.src = msg.message.audio
  audioTag.play()
}

function uploadSticker(blob, emotion) {

  const token = store.get('forum:token')
  const form = new FormData()

  form.append('video', blob.video)
  form.append('audio', blob.audio)
  form.append('emotion', emotion || 'happy')

  $.ajax('/stickers', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    data: form,
    contentType: false,
    processData: false,
    success: () => {
      console.log(`successfully uploaded`)
    }
  })
}