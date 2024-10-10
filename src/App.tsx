import { useState ,useEffect} from 'react'
import './App.css'
import "./index.css";
import Registration from './views/Registration'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom' 
import { ILoginValues } from './types/userDetails';
import { useAuthGuard } from './sharedHooks/sharedHook';
import { useSelector } from 'react-redux';

interface RootLayoutProps{
  user:ILoginValues,
  test_mode:boolean
}

function App({user,test_mode}: RootLayoutProps) {

const isAuth = ()=>{
const token = window.localStorage.getItem('access_token')
if(token){
  return true
}
else{
  return false
}
  }
useEffect(()=>{

},[])
//  useAuthGuard(user,test_mode)
  return (
    <>
    <Navbar user={user}/>
    <Outlet/>
   </>
  )
}

export default App
