import { useContext } from 'react'
import './App.css'
import io from 'socket.io-client'
import { useNavigate } from 'react-router-dom'
import { WordContext } from './contexts/WordContext'
export const socket = io.connect('http://localhost:3001')

function App() {

  const {setWords, users, setUsers, name, setName, roomToJoin, setRoomToJoin, setScores} = useContext(WordContext)

  const navigate = useNavigate()

  socket.on('users', function(users) {
    setUsers(users)
  })

  let joinRoom = () => {
    socket.emit('join-room', {name, roomToJoin})
  }

  let startGame = () => {
    socket.emit('start-game', (roomToJoin))
  }

  socket.on('game-started', function({words, scores}) {
    setWords(words)
    setScores(scores)
    navigate('/game')
  })

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
      {users.length >= 4 && <button onClick={startGame}>Start Game</button>}
    </>
  )
}

export default App