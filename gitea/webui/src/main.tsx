import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Add dark mode class to root html element
document.documentElement.classList.add('dark')

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)