import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import TodoApp from './App/App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TodoApp />
  </React.StrictMode>,
)
