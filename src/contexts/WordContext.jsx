import { createContext, useState } from "react";

export const WordContext = createContext(null)

// eslint-disable-next-line react/prop-types
export default function WordProvider ({children}) {

    const [words, setWords] = useState([])
    const [users, setUsers] = useState([])
    const [name, setName] = useState('')
    const [roomToJoin, setRoomToJoin] = useState('')
    const [scores, setScores] = useState({})

    return (
        <WordContext.Provider value={
            {
                words: words,
                setWords: setWords,
                users: users,
                setUsers: setUsers,
                name: name,
                setName: setName,
                roomToJoin: roomToJoin,
                setRoomToJoin: setRoomToJoin,
                scores: scores,
                setScores: setScores
            }
        }>
            {children}
        </WordContext.Provider>
    )
}