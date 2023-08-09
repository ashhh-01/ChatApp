import { useState } from 'react'
import "./style.scss"
import Register from './pages/Register'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Register/>
    )
}

export default App
