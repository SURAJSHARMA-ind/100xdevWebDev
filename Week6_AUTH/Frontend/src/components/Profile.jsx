import React, { useContext, useEffect } from 'react'
import UserContext from '../context/userDetail/ProfileContext'
import axios from 'axios'
function Profile() {
  const {userDetail} =useContext(UserContext)
  const token = localStorage.getItem('token')
  const apicall = async ()=>{
    const response = await axios.get('http://localhost:4000/profile',{
      headers:{
        Authorization :token
      }
    })
    console.log(response);
  }

  useEffect(()=>{
    apicall();
  },[])
  
  return (
    <div className='h-screen w-full flex justify-center  bg-gradient-to-tl from-zinc-900 to-slate-900 text-white'>
      <h1 className='text-3xl '>Welcome <span className='bg-gradient-to-tr from-violet-600 text-transparent to-pink-500 bg-clip-text'>{userDetail}</span> </h1>
    </div>
  )
}

export default Profile
