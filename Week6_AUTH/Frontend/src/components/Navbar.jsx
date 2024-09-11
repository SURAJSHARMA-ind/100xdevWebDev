import React from 'react'

function Navbar() {
    return (

        <div className='flex justify-between items-center bg-gradient-to-tl from-zinc-900 to-slate-900  border-0 border-b border-gray-800 text-white h-16 '>
            <div className='flex flex-row gap-2'>
                <img src="	https://appx-wsb-gcp.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg" alt="logo" className='w-10 h-10 rounded-full mx-2 ' />
                <h1 className='text-blue-500 text-xl lato-regular'>100XDevs</h1>
            </div>
            <div className='flex flex-row gap-2 m-2'>
                <button className='bg-gradient-to-r from-slate-300 to-slate-400  h-10 p-2 shadow-slate-50  text-black  text-sm w-16 hover:from-slate-400 hover:to-slate-500 rounded-md'>Login</button>
                <button className='bg-gradient-to-t from-blue-600 to-indigo-600 shadow-transparent hover:from-blue-700 hover:to-indigo-700 h-10 p-2 text-white text-sm w-18 rounded-md'>
                    Join now
                </button>

            </div>
        </div>

    )
}

export default Navbar
