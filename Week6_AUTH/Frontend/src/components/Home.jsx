import React, { useEffect } from 'react'

function Home() {
    
    return (
        <div className='h-screen w-full justify-center items-center bg-gradient-to-tl from-zinc-900 to-slate-900'>
            <div className='flex flex-wrap  flex-col justify-center  gap-2 item-center'>
                <div className=' flex flex-row text-6xl gap-1 justify-center '>
                    <span className='font-bold text-center bg-gradient-to-r from-sky-600 to-indigo-600 text-transparent bg-clip-text '>100xDevs,</span> 
                    <span className='font-bold text-center bg-gradient-to-r from-slate-300 to-slate-500 text-transparent bg-clip-text'>because</span>
                </div>
                <h1 className='text-4xl font-bold text-center bg-gradient-to-r from-slate-300 to-slate-500 text-transparent bg-clip-text '>10x ain't enough!</h1>
                <p className='bg-gradient-to-r text-center font-semibold from-slate-300 to-slate-500 text-transparent bg-clip-text'>A beginner-friendly platform for mastering programming skills.</p>
                <div className='flex justify-center text-sm '>
                    <a href="https://harkirat.classx.co.in/new-courses">
                        <button className='bg-gradient-to-t from-blue-500 w-max text-white to-blue-600 px-5 py-2 rounded-md m-2'>Explore Course</button>
                    </a>
                    <a href="https://projects.100xdevs.com/" target='_blank'>
                        <button className='bg-gradient-to-t from-slate-200 w-max  to-slate-400 px-5 py-2 rounded-md m-2'>Explore Notes</button>
                    </a>
                </div>

                

            </div>
        </div>
    )
}

export default Home
