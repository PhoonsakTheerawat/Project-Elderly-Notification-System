import React from 'react'
import Navbar from './Navbar'
import Navbarhome from './Navbarhome'

function Home() {
  return (
    <div className='w-screen h-screen'>
        <div className='flex flex-col max-w-5xl h-full my-0 mx-auto items-center bg-white rounded-t-3xl'>
          <Navbar />
          <p className='border-4 border-red-400 mt-24'>HOME</p>
          <p className='border-4 border-red-400 mt-6'>HOME</p>
          <p className='border-4 border-red-400 mt-6'>HOME</p>
          <p className='border-4 border-red-400 mt-6'>HOME</p>
          
          <Navbarhome />
        </div>
    </div>

  )
}

export default Home