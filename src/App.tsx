import { useState ,useEffect} from 'react'
import './App.css'
import "./index.css";
import Registration from './views/Registration'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom' 
import { ILoginValues } from './types/userDetails';
import { useAuthGuard } from './sharedHooks/sharedHook';
import { useSelector } from 'react-redux';



function App() {




  return (
    <>
    <Navbar/>
    <Outlet/>
   </>
  )
}

export default App
