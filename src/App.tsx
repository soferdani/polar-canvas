import { useState } from 'react'
import './App.css'
import { Canvas } from './canvas/Canvas'

function App() {
  const [count, setCount] = useState(0)

  
  return (
    <div className="App">
      <Canvas width={500} height={500} ></Canvas>
    </div>
  )
}

export default App
