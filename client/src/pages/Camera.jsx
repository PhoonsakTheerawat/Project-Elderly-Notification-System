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
      <div className='flex flex-col max-w-5xl h-full my-0 mx-auto items-center bg-white rounded-t-3xl'>
        <Navbar />
        <Webcam ref={webcamRef} />
        <Navbarcamera />
        <button onClick={capture}>ถ่ายภาพ</button>
        {image && <img src={image} alt="ภาพจากกล้อง webcam" />}
      </div>
    </div>
  );
}

export default Camera;
