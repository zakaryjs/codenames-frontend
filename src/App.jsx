import { useContext } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom'
import { WordContext } from './contexts/WordContext'
import { motion } from "framer-motion"
import Header from './components/Header'
import { socket } from './components/socket'

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
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      <Header />
      <div>
        <h3>Enter Username</h3>
        <input value={name} onChange={(event) => setName(event.target.value)} />
      </div>
      <div>
        <h3>Enter Room Code</h3>
        <input value={roomToJoin} onChange={(event) => setRoomToJoin(event.target.value)} />
        <button className='join-room' onClick={joinRoom}>Join Room</button>
      </div>
      {users.length > 0 && <h3>Joined Users:</h3>}
      {users.length > 0 && users.map(user => (
        <h4 key={user}>{user}</h4>
      ))}
      {users.length >= 4 && <button className='start-game' onClick={startGame}>Start Game</button>}
    </motion.div>
  )
}

export default App