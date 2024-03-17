import { useContext, useEffect, useState } from "react"
import { WordContext } from "./contexts/WordContext"
import { socket } from "./App"

export default function Game() {

    const [teams, setTeams] = useState({
        orange: [],
        blue: []
    })

    const [spymasters, setSpymasters] = useState({
        orange: [],
        blue: []
    })

    const [teamToJoin, setTeamToJoin] = useState('')
    const [joinedTeam, setJoinedTeam] = useState(false)
    const [isSpymaster, setIsSpymaster] = useState(false)
    const {words, users, name, roomToJoin} = useContext(WordContext)

    function setTeam(team) {
        setTeamToJoin(team)
    }

    let joinTeam = () => {
        socket.emit('join-team', {name, roomToJoin, teamToJoin})
      }

    let becomeSpymaster = () => {
        socket.emit('become-spymaster', {name, roomToJoin, teamToJoin})
        setIsSpymaster(true)
      }

    useEffect(() => {
        if (!joinedTeam) {
            if (teamToJoin == 'orange' || teamToJoin == 'blue') {
                joinTeam()
                setJoinedTeam(true)
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [teamToJoin])

    socket.on('teams', function(toSend) {
        console.log(toSend)
        setTeams(toSend)
    })

    socket.on('spymasters', function(toSend) {
        console.log(toSend)
        setSpymasters(toSend)
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
                <h4>Spymasters</h4>
                {spymasters.orange.map(player => (
                    <p key={player} className="centred-word">{player}</p>
                ))}
                {joinedTeam && !isSpymaster && teamToJoin == 'orange' && <button onClick={becomeSpymaster}>Become Spymaster</button>}
                {!joinedTeam && <button onClick={() => {setTeam('orange')}}>Join Orange Team</button>}
                <h4>All Players</h4>
                {teams.orange.map(player => (
                    <p key={player} className="centred-word">{player}</p>
                ))}
                <h3>Blue Team</h3>
                <h4>Spymasters</h4>
                {spymasters.blue.map(player => (
                    <p key={player} className="centred-word">{player}</p>
                ))}
                {joinedTeam && !isSpymaster && teamToJoin == 'blue' && <button onClick={() => {becomeSpymaster()}}>Become Spymaster</button>}
                {!joinedTeam && <button onClick={() => {setTeam('blue')}}>Join Blue Team</button>}
                <h4>All Players</h4>
                {teams.blue.map(player => (
                    <p key={player} className="centred-word">{player}</p>
                ))}
            </div>
        </>
    )
}