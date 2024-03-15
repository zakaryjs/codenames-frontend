import { useContext, useEffect, useState } from "react"
import { WordContext } from "./contexts/WordContext"
import { socket } from "./App"

export default function Game() {

    const [teamToJoin, setTeamToJoin] = useState('')
    const {words, users, name, roomToJoin} = useContext(WordContext)

    let joinTeam = () => {
        socket.emit('join-team', {name, roomToJoin, teamToJoin})
      }

    useEffect(() => {
        console.log(users)
    })

    useEffect(() => {
        if (teamToJoin == 'orange' || teamToJoin == 'blue') {
            joinTeam()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [teamToJoin])

    socket.on('teams', function(toSend) {
        console.log(toSend)
    })

    return (
        <>
            <h1>Codenames</h1>
            <h2>Built with React, Node and Socket.IO</h2>
            <div className="wrapper">
                {words.map(word => (
                    <div key={word.word} className="word-square">
                        <p className="centred-word">{word.word}</p>
                    </div>
                ))}
            </div>
            <div>
                <h3>Unassigned</h3>
                {users.map(user => (
                    <p key={user} className="centred-word">{user}</p>
                ))}
                <h3>Orange Team</h3>
                <button onClick={() => {setTeamToJoin('orange')}}>Join Orange Team</button>
                <h3>Blue Team</h3>
                <button onClick={() => {setTeamToJoin('blue')}}>Join Blue Team</button>
            </div>
        </>
    )
}