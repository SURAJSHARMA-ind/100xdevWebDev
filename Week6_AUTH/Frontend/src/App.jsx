import { useState, useEffect, useContext } from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import axios from 'axios';
import UserContext from './context/userDetail/ProfileContext';
import { useNavigate } from 'react-router-dom';
import AuthContext from './context/Auth/AuthContext';
function App() {
  const { setUserDetail } = useContext(UserContext)
  const { setLoginState } = useContext(AuthContext)
  const navigate = useNavigate()
  const tokenprovider = async () => {
    const response = await axios.get(`http://localhost:5000/profile`, {
      headers: {
        Authorization: `${localStorage.getItem('token')}`
      }
    });


    // const settoken = response.data.token
    // localStorage.setItem('token', settoken)
    // console.log(response);
    console.log('status code is ', response.data);
    const status = response.status
    console.log(status);
    if (status == 200) {
      const username = response.data.userDetail
      console.log(username);
      setUserDetail(username)
      navigate('/profile')
      setLoginState(true)
    }
  }
  useEffect(() => {
    tokenprovider()
  }, [])
  return (
    <>

      <Navbar />
      <Outlet />

    </>
  )
}

export default App
