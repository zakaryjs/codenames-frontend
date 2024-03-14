import { createContext, useState } from "react";


export const WordContext = createContext(null)

// eslint-disable-next-line react/prop-types
export default function WordProvider ({children}) {

    const [words, setWords] = useState([])

    return (
        <WordContext.Provider value={
            {
                words: words,
                setWords: setWords
            }
        }>
            {children}
        </WordContext.Provider>
    )
}