import React from 'react'
import Navbar from './Navbar'
import Navbarpill from './Navbarpill'

function Pill() {
  return (
    <div className='w-screen h-screen'>
      <div className='flex flex-col max-w-5xl h-full my-0 mx-auto items-center bg-white rounded-t-3xl'>
        <Navbar />
        
        <Navbarpill />
      </div>
    </div>
  )
}

export default Pill