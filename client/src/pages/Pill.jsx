import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Navbarpill from './Navbarpill';

function Pill() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const SUser = localStorage.getItem("user");
    const PUser = JSON.parse(SUser);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('email', PUser);

    try {
      const res = await axios.post('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='w-screen h-screen' style={{ backgroundImage: 'linear-gradient(to bottom, #003366, #00539e, #0077cc)' }}>
      <div className='flex flex-col max-w-5xl h-full my-0 mx-auto items-center bg-white rounded-t-3xl' style={{ backgroundImage: 'linear-gradient(to bottom, #003366, #00539e, #0077cc)' }}>
        <Navbar />
        <div className='flex flex-col my-auto items-center'>
          <input className='bg-white' type="file" onChange={handleFileChange} />
          <button className='mt-5 bg-white w-20 h-8 rounded-lg' onClick={handleUpload}>Upload</button>
        </div>
        <Navbarpill />
      </div>
    </div>
  )
}

export default Pill;
