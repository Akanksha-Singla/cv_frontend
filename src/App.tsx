import { useState } from 'react'
import './App.css'
import "./index.css";
import Registration from './views/Registration'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom' 

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
    <Navbar/>
    <Outlet/>
   </>
  )
}

export default App
