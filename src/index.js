import React from 'react'
import ReactDOM from 'react-dom/client'
import Hangman from './components/hangman.js';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Hangman />
  </React.StrictMode>
)
