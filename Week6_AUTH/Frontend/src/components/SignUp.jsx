import React, { useState } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { Navigate, useNavigate } from 'react-router-dom'
function SignUp() {
  // const [request, setRequest] = useState('signup')
  const [formData, SetFormData] = useState({
    username: '',
    password: ''
  })
  const navigate = useNavigate()

  const changeHandler = (e) => {
    const { name, value } = e.target
    SetFormData({ ...formData, [name]: value })

  }

  const signupHandler = async (e) => {
    try {
      e.preventDefault()
      const response = await axios.post(`http://localhost:5000/signup`, formData);
      // const settoken = response.data.token
      // localStorage.setItem('token', settoken)
      if (response.status === 200) {
        toast.success('Account Created')
      }
      setTimeout(() => {
        navigate('/signin')
      }, 3000)
    }
    catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error('User Already Exists')

      } else {
        toast.error('Something went wrong');
      }
    }
  }
  return (

    <form onSubmit={signupHandler} action='' method='post' className=" h-screen bg-gradient-to-tl gap-4 from-zinc-900 to-slate-900 w-full justify-start flex-col flex flex-wrap items-center">
      <div><Toaster /></div>
      
      <h1 className='text-4xl text-white font-bold'>Signup</h1>                                     

      <div className=" border-indigo-500  border-2 justify-center p-4 bg-gradient-to-tl text-white from-zinc-800 to-slate-700 rounded-lg  flex flex-col  min-w-[30%] ">
        <div className='mb-4'>
          <h1 className="text-white text-center font-bold text-3xl ">Welcome to <span className='bg-gradient-to-r from-sky-600 to-indigo-600 text-transparent bg-clip-text'>100xDevs</span> </h1>
          <p className='text-center text-gray-400'>Signup to become part of 100xdevs </p>
        </div>
        <div className="relative mb-4">
          <label for="UserName" className="leading-7 text-sm ">User Name</label>
          <input
            minLength={6}
            maxLength={30}
            required
            onChange={changeHandler}
            placeholder="Enter Username"
            type="text"
            value={formData.username}
            name="username"
            className="w-full  bg-zinc-900 rounded border border-none border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>

        <div className="relative mb-4">
          <label for="password" className="leading-7 text-sm ">Password</label>
          <input
            minLength={8}
            maxLength={30}
            required
            onChange={changeHandler}
            placeholder='Your Password'
            type="password"
            value={formData.password}
            name="password"
            className="w-full bg-zinc-900 rounded  border border-none border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Sign up</button>
      </div>
    </form>


  )
}

export default SignUp
