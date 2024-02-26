import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Container, Input, Rule } from 'postcss'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Rules from './pages/Rules.jsx'
import homepage from './pages/homepage.jsx'

function App() {
const [count, setCount] = useState(0)

return (
   <>
      <Login/>
   </>
)
}

export default App