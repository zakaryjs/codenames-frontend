import { useContext } from "react"
import { WordContext } from "./contexts/WordContext"



export default function Game() {

    const {words} = useContext(WordContext)


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
        </>
    )
}