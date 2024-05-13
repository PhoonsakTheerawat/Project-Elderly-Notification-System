import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import Navbar from './Navbar';
import Navbarcamera from './Navbarcamera';

function Camera() {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);

  const capture = () => {
    const capturedImage = webcamRef.current.capture();
    setImage(capturedImage);
  };

  return (
    <div className='w-screen h-screen'>
      <div className='flex flex-col max-w-full h-full my-0 mx-auto items-center bg-white rounded-t-3xl' style={{ backgroundImage: 'linear-gradient(to bottom, #003366, #00539e, #0077cc)' }}>
        <Navbar />
        <div className='flex w-auto h-auto mt-48 border-4 border-white rounded-lg '>
          <Webcam ref={webcamRef} />
        </div>
        <Navbarcamera />
        
      </div>
    </div>
  );
}

export default Camera;
