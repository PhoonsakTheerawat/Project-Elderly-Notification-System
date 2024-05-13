import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Navbarhome from './Navbarhome';
import Axios from 'axios';
// Import Toast components
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';


function Home() {
  const [employeeList, setEmployeeList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    Axios.get('http://localhost:3001/home')
      .then((response) => {
        setEmployeeList(response.data);
        const userEmail = localStorage.getItem('user');
        const parsedUser = JSON.parse(userEmail);
        const filtered = response.data.filter((employee) => employee.email === parsedUser);
        setFilteredList(filtered);
      })
      .catch((error) => {
        console.error('Error fetching employee data:', error);
        toast.error('Error fetching employee data. Please try again later.');
      });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();
      const currentMinute = currentTime.getMinutes();

      filteredList.forEach((employee) => {
        const pillTime = employee.hour;
        const pillHour = parseInt(pillTime.split(':')[0]);
        const pillMinute = parseInt(pillTime.split(':')[1]);

        if (currentHour === pillHour && currentMinute === pillMinute) {
          setShowNotification(true);
          // Add this line to show notification only for the matching employee**
          toast.info(`ถึงเวลาทานยา`+employee.pill_name+`แล้วครับ`);


        }
      });
    }, 15000);

    return () => clearInterval(intervalId);
  }, [filteredList]);

  return (
    <div className="w-screen h-screen">
      {/* Render ToastContainer outside of any conditional block for consistent display */}
      <ToastContainer />
      <div className="flex flex-col max-w-full h-full my-0 mx-auto items-center bg-white rounded-t-3xl" style={{ backgroundImage: 'linear-gradient(to bottom, #003366, #00539e, #0077cc)' }}>
        <Navbar />
        <div className='mt-16'></div>
        {/* แสดงเฉพาะข้อมูลที่กรอง */}
        {filteredList.map((val, key) => (
          <div key={key}>
            <div className="bg-white rounded-lg shadow-md mt-12">
              <div className="p-4">
                <h5 className="font-bold text-xl mb-2">{val.hour} ชื่อยา: {val.pill_name}</h5>
                <p className="flex justify-center font-semibold text-gray-700 self-center text-lg">{val.meal}</p>
                <p className="flex justify-center font-semibold text-gray-700 text-lg">{val.time_clock}</p>
              </div>
            </div>
          </div>
        ))}
        <Navbarhome />
      </div>
    </div>
  );
}

export default Home;
