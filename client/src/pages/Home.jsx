import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Navbarhome from './Navbarhome';
import Axios from 'axios';

function Home() {
  const [employeeList, setEmployeeList] = useState([]);
  const [filteredList, setFilteredList] = useState([]); // สถานะใหม่สำหรับข้อมูลที่กรอง

  useEffect(() => {
    Axios.get('http://localhost:3001/home')
      .then((response) => {
        setEmployeeList(response.data);
        // กรองข้อมูลทันทีหลังจากดึงข้อมูล
        const userEmail = localStorage.getItem('user');
        const parsedUser = JSON.parse(userEmail);
        const filtered = response.data.filter(
          (employee) => employee.email === parsedUser
        );
        setFilteredList(filtered);
      });
  }, []);

  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col max-w-5xl h-full my-0 mx-auto items-center bg-white rounded-t-3xl">
        <Navbar />
        <div className='mt-16'></div>
        {/* แสดงเฉพาะข้อมูลที่กรอง */}
        {filteredList.map((val, key) => (
          <div key={key}>
            <div class="bg-slate-50 rounded-lg shadow-md mt-12">
              <div class="p-4">
                <h5 class="font-bold text-xl mb-2">{val.hour} : {val.minute}  ชื่อยา: {val.pill_name}</h5>
                <p class="flex justify-center font-semibold text-gray-700 self-center text-lg">{val.meal}</p>
                <p class="flex justify-center font-semibold text-gray-700 text-lg">{val.time_clock}</p>
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
