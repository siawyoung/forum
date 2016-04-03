
const getUser = (socket) => {
  let name = Cookies.get('name')
  if (!name || name === 'null') {
    name = window.prompt("What is your name/handle?")
    Cookies.set('name', name)
  }

  socket.emit('io:name', name)
  return name
}

const SearchBar = ({
  something
}) => {
  return (
    <div id="SearchBar">
      <input type="text" placeholder="Search" />
    </div>
  )
}

const RoomTitle = ({
  something
}) => {
  return (
    <div id="RoomTitle">
      Somebody
    </div>
  )
}

const TopBar = ({
  placeholder
}) => {
  return (
    <div id="TopBar">
      <div className="one-third faint-right-border">
        <SearchBar />
      </div>
      <div className="two-third">
        <RoomTitle />
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

const MessageList = ({
  data
}) => {
  return (
    <div id="MessageList">
      {data.map((msg, index) => (
        <ChatBubble key={index} text={msg} />
      ))}
    </div>
  )
}

const ChatView = ({
  data
}) => {
  return (
  <div id="ChatView" className="top-level">
    <TopBar />
    <div className="one-third faint-right-border">
      <RoomList />
    </div>
    <div className="two-third">
      <MessageList data={data} />
      <ChatInput />
    </div>
  </div>
)}

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

const ChatInput = ({
  data
}) => {
  return (
    <div id="ChatInput" className="faint-top-border">
      <input type="text" />
    </div>
  )
}

const parseJSONLoad = (payload) => {
  return payload.map(x => JSON.parse(x))
}

const renderView = (data) => {
  ReactDOM.render(
    <ChatView data={parseJSONLoad(data)} />,
    document.getElementById('root')
  )
}

const initialLoad = () => {
  $.get('/load', (data) => {
    renderView(data)
  })
}

$(document).ready(() => {
  const socket = io()
  getUser(socket)

  initialLoad()

})