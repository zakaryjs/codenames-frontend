import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Game from './Game.jsx'
import WordProvider from './contexts/WordContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WordProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/game' element={<Game />} />
      </Routes>
      </BrowserRouter>
    </WordProvider>
  </React.StrictMode>,
)
