
const getUser = (socket) => {
  let name = Cookies.get('name')
  if (!name || name === 'null') {
    name = window.prompt("What is your name/handle?")
    Cookies.set('name', name)
  }

  socket.emit('io:name', name)
  return name
}

const ChatView = ({
  data
}) => {
  return (
  <div id="chat-view">
    {data.map((msg, index) => (
      <ChatBubble key={index} text={msg} />
    ))}
    <ChatInput />
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

const ChatInput = () => (

  <input type="text"/>

)

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