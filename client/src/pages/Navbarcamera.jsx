import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Navbarcamera() {
    let navigate = useNavigate()
  
    return (
      <div className='fixed bottom-0 w-full'>
        <div className='flex bottom-0 justify-around w-full h-full bg-sky-400 rounded-b-3xl'>
          <img onClick={() => navigate("/home")} className='h-16 w-16 p-1 self-center' src="images/homeW.png" alt="home" />
          <img onClick={() => navigate("/time")} className='h-16 w-16 p-1 self-center' src="images/clock.png" alt="clock" />
          <img onClick={() => navigate("/pill")} className='h-16 w-16 p-1 self-center' src="images/drug.png" alt="drug" />
          <img onClick={() => navigate("/sound")} className='h-14 w-16 p-1 self-center' src="images/mic.png" alt="mic" />
          <img onClick={() => navigate("/camera")} className='h-16 w-16 p-1 self-center' src="images/cameraB.png" alt="camera" />
        </div>  
      </div>
    )
  }

export default Navbarcamera