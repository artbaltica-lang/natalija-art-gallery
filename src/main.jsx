import React from 'react'
import ReactDOM from 'react-dom/client'

function App() {
  return (
    <main>
      <h1>Natalija Art Gallery</h1>
      <p>Welcome to my art gallery.</p>
    </main>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)