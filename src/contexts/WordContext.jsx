import { createContext, useState } from "react";


export const WordContext = createContext(null)
export const UserContext = createContext(null)

// eslint-disable-next-line react/prop-types
export default function WordProvider ({children}) {

    const [words, setWords] = useState([])
    const [users, setUsers] = useState([])
    const [name, setName] = useState('')
    const [roomToJoin, setRoomToJoin] = useState('')

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
                setRoomToJoin: setRoomToJoin
            }
        }>
            {children}
        </WordContext.Provider>
    )
}