import React, { useState } from 'react';
import Navbar from './Navbar';
import Navbarsound from './Navbarsound';
import axios from 'axios'; // Assuming Axios is installed

function Sound() {
  const [message, setMessage] = useState(''); // State to store user input

  // Replace with your actual Line Notify access token (**Important: Keep confidential!**)
  const token = '4ZcsvnxQvs7nS7oBFYKmOAV7ghwuBL9lnqmK7cVpyLy'; // Placeholder, remove this line in production

  const handleSendMessage = async () => {
    if (!message) {
      alert('Please enter a message to send!');
      return;
    }

    try {
      const response = await axios.post(
        'https://notify-api.line.me/api/notify',
        { message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Success:', response.data);
      setMessage(''); // Clear message input after successful send
    } catch (error) {
      console.error('Error sending notification:', error);

      // Handle specific errors (optional):
      if (error.response?.status === 401) {
        alert('Invalid access token. Please check your token and try again.');
      } else if (error.response?.status === 429) {
        alert('Rate limit exceeded. Please try again later.');
      } else {
        alert('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className='w-screen h-screen'>
      <div className='flex flex-col max-w-5xl h-full my-0 mx-auto items-center bg-white rounded-t-3xl'>
        <Navbar />
        <p className='border-4 border-red-400 mt-24'>Sound</p>
        <p className='border-4 border-red-400 mt-6'>Sound</p>
        <p className='border-4 border-red-400 mt-6'>Sound</p>
        <p className='border-4 border-red-400 mt-6'>Sound</p>

        <div className='flex items-center mt-12'>
          <input
            type='text'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder='Enter message for notification'
            className='border border-gray-300 rounded-md px-3 py-2 mr-4'
          />
          <button onClick={handleSendMessage} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md'>
            Send Notification
          </button>
        </div>

        <Navbarsound />
      </div>
    </div>
  );
}

export default Sound;
