import { useContext } from "react"
import { WordContext } from "./contexts/WordContext"



export default function Game() {

    const {words} = useContext(WordContext)


    return (
        <>
            <h1>Codenames</h1>
            <h2>Built with React, Node and Socket.IO</h2>
            {words.map(word => (
                <div key={word.word} className="word-square">
                    <p>{word.word}</p>
                </div>
            ))}
        </>
    )
}