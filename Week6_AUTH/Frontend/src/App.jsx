import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signin from './components/Signin'
import Navbar from './components/Navbar'
import Home from './components/Home'
import { Outlet } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  const tokenprovider = async () => {
    const response = await axios.post(`http://localhost:5000/signin`, {
        headers: {
            Authorization: `${localStorage.getItem('token')}`
        }
    });
    
    const settoken = response.data.token
    localStorage.setItem('token', settoken)
    console.log(response);
    console.log('status code is ',response.status);
    signinHandler
}
useEffect(()=>{
    
})
  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}

export default App
