import { useContext, useEffect, useState } from "react"
import { WordContext } from "./contexts/WordContext"
import { socket } from "./App"

export default function Game() {

    const [teams, setTeams] = useState({
        orange: [],
        blue: []
    })

    const [teamToJoin, setTeamToJoin] = useState('')
    const [joinedTeam, setJoinedTeam] = useState(false)
    const {words, users, name, roomToJoin} = useContext(WordContext)

    function setTeam(team) {
        setTeamToJoin(team)
        setJoinedTeam(true)
    }

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
        setTeams(toSend)
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
                <h3>Player List</h3>
                {users.map(user => (
                    <p key={user} className="centred-word">{user}</p>
                ))}
                <h3>Orange Team</h3>
                {!joinedTeam && <button onClick={() => {setTeam('orange')}}>Join Orange Team</button>}
                {teams.orange.map(player => (
                    <p key={player} className="centred-word">{player}</p>
                ))}
                <h3>Blue Team</h3>
                {!joinedTeam && <button onClick={() => {setTeam('blue')}}>Join Blue Team</button>}
                {teams.blue.map(player => (
                    <p key={player} className="centred-word">{player}</p>
                ))}
            </div>
        </>
    )
}