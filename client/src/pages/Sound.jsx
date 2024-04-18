import React from 'react'
import Navbar from './Navbar'
import Navbarsound from './Navbarsound'

function Sound() {
    return (
        <div className='w-screen h-screen'>
            <div className='flex flex-col max-w-5xl h-full my-0 mx-auto items-center bg-white rounded-t-3xl'>
              <Navbar />
              <p className='border-4 border-red-400 mt-24'>Sound</p>
              <p className='border-4 border-red-400 mt-6'>Sound</p>
              <p className='border-4 border-red-400 mt-6'>Sound</p>
              <p className='border-4 border-red-400 mt-6'>Sound</p>
              
              <Navbarsound />
            </div>
        </div>
    
      )
}

export default Sound