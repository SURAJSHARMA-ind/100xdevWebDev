import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import UserContextProvider from './context/UserContextProvider';

function App() {

  const tokenprovider = async () => {
    const response = await axios.post(`http://localhost:5000/`, {
      headers: {
        Authorization: `${localStorage.getItem('token')}`
      }
    });

    const settoken = response.data.token
    localStorage.setItem('token', settoken)
    console.log(response);
    console.log('status code is ', response.status);
    signinHandler
  }
  useEffect(() => {

  })
  return (
    <>
      <UserContextProvider>
        <Navbar />
        <Outlet />
      </UserContextProvider>
    </>
  )
}

export default App
