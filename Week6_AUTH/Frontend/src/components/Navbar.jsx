import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
function Navbar() {
    const navigate = useNavigate();
    const loginhandler =()=>{
        navigate('/signin')
    }

    return (

        <div className='flex flex-wrap h-16 sticky w-full justify-center items-center bg-gradient-to-tl from-zinc-900 to-slate-900  border-0 border-b border-gray-800 text-white  '>
            <div className='flex justify-between w-[74%] items-center'>
                <Link to="/">
                <div className='flex flex-row gap-2 cursor-pointer'>
                    <img src="	https://appx-wsb-gcp.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg" alt="logo" className='w-10 h-10 rounded-full mx-2 ' />
                    <h1 className=' bg-gradient-to-r from-blue-400   to-blue-600 text-transparent bg-clip-text text-xl font-bold'>100xDevs</h1>
                </div>
                </Link>
                <div className='flex flex-row gap-2 m-2'>
                    <button onClick={loginhandler} className='bg-gradient-to-r from-slate-300 to-slate-400  h-10 p-2 shadow-slate-50  text-black  text-sm w-16 hover:from-slate-400 hover:to-slate-500 rounded-md'>Login</button>

                    <a href="https://harkirat.classx.co.in/new-courses" target='_blank'  >
                        <button className='bg-gradient-to-t from-blue-600 to-indigo-600 shadow-transparent hover:from-blue-700 hover:to-indigo-700 h-10 p-2 text-white text-sm w-18 rounded-md'>
                            Join now
                        </button>
                    </a>

                </div>
            </div>
        </div>

    )
}

export default Navbar
