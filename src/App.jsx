import { useState } from 'react'
import './App.css'
import io from 'socket.io-client'
const socket = io.connect('http://localhost:3001')

function App() {

  const [users, setUsers] = useState([])
  const [roomToJoin, setRoomToJoin] = useState('')

  let setUsername = () => {
    socket.emit('send-nickname', 'Zakary')
  }

  socket.on('users-list', function(users) {
    console.log(users)
    setUsers(users)
  })

  let joinRoom = () => {
    socket.emit('join-room', roomToJoin)
  }

  return (
    <>
      <h1>Codenames</h1>
      <h2>Built with React, Node and Socket.IO</h2>
      <button onClick={setUsername}>Set Nickname</button>
      {users.map(user => (
        <h4 key={user}>{user}</h4>
      ))}
      <input value={roomToJoin} onChange={(event) => setRoomToJoin(event.target.value)} />
      <button onClick={joinRoom}>Join Room</button>
    </>
  )
}

export default App
