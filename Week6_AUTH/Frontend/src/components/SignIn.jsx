import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

function Signin() {
    const [request, setRequest] = useState('signup')
    const [formData, SetFormData] = useState({
        username: '',
        password: ''
    })
    const token = localStorage.getItem('token')
    const handlesignin = () => {
        setRequest('signin')
    }
    const handleprofile = () => {
        setRequest('profile')
    }

    const changeHandler = (e) => {
        const { name, value } = e.target
        SetFormData({ ...formData, [name]: value })

    }
    const signupHandler = async (e) => {
        e.preventDefault()
        const response = await axios.post(`http://localhost:5000/${request}`, formData, {
            headers: {
                Authorization: `${token}`
            }
        });
        const settoken = response.data.token
        localStorage.setItem('token', settoken)
        console.log(response);
        console.log(token);
    }

    return (

        <form onSubmit={signupHandler} action='' method='post' className=" h-screen bg-gradient-to-tl from-zinc-900 to-slate-900 w-full justify-center  flex flex-wrap items-center">

            <div className=" justify-center p-4 bg-gray-100 rounded-lg  flex flex-col  min-w-[30%] ">
                <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign In</h2>
                <div className="relative mb-4">
                    <label for="UserName" className="leading-7 text-sm text-gray-600">User Name</label>
                    <input onChange={changeHandler} type="text" value={formData.username} name="username" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
                {/* <div className="relative mb-4">
                    <label for="emial" className="leading-7 text-sm text-gray-600">Email</label>
                    <input onChange={changeHandler} type='email' value={formData.email} name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div> */}
                <div className="relative mb-4">
                    <label for="password" className="leading-7 text-sm text-gray-600">Password</label>
                    <input onChange={changeHandler} type="password" value={formData.password} name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
                <button className="text-white bg-gray-800 border-0 py-2 px-8 focus:outline-none hover:bg-gray-900 rounded text-lg">Sign up</button>
                <button onClick={handlesignin} className="text-white bg-gray-800 border-0 py-2 px-8 focus:outline-none hover:bg-gray-900 rounded text-lg">Sign in</button>
                <button onClick={handleprofile} className="text-white bg-gray-800 border-0 py-2 px-8 focus:outline-none hover:bg-gray-900 rounded text-lg">profile</button>
            </div>
        </form>

    )
}

export default Signin
