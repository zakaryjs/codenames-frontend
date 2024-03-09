import { useState } from 'react'
import './App.css'
import io from 'socket.io-client'
const socket = io.connect('http://localhost:3001')

function App() {

  const [name, setName] = useState('')
  const [users, setUsers] = useState([])
  const [roomToJoin, setRoomToJoin] = useState('')

  socket.on('users', function(users) {
    setUsers(users)
  })

  let joinRoom = () => {
    socket.emit('join-room', {name, roomToJoin})
  }

  return (
    <>
      <h1>Codenames</h1>
      <h2>Built with React, Node and Socket.IO</h2>
      <div>
        <h3>Enter Username</h3>
        <input value={name} onChange={(event) => setName(event.target.value)} />
      </div>
      <div>
        <h3>Enter Room Code</h3>
        <input value={roomToJoin} onChange={(event) => setRoomToJoin(event.target.value)} />
        <button onClick={joinRoom}>Join Room</button>
      </div>
      {users.length > 0 && <h3>Joined Users:</h3>}
      {users.length > 0 && users.map(user => (
        <h4 key={user}>{user}</h4>
      ))}
    </>
  )
}

export default App