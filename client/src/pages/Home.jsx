import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Navbarhome from './Navbarhome';
import Axios from 'axios';
// Import Toast components
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { Howl, Howler } from 'howler';

function Home() {
  const [employeeList, setEmployeeList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [currentPillName, setCurrentPillName] = useState('');
  const [currentMeal, setCurrentMeal] = useState('');
  const [currentHour, setCurrentHour] = useState('');

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
          if(employee.state_noti == "ปิด"){
            console.log("non")
          }else{








          setShowNotification(true);
          // Add this line to show notification only for the matching employee**
          toast.info(`ถึงเวลาทานยา`+employee.pill_name+`แล้วครับ`);
          setCurrentPillName(employee.pill_name);
          setCurrentMeal(employee.meal);
          setCurrentHour(employee.hour);
          

          if(employee.time_clock == "เช้า"){
            const soundmorning = new Howl({
              src: ['sounds/1234.mp3']
            });
            soundmorning.play();
          }else if(employee.time_clock == "กลางวัน"){
            const soundnoon = new Howl({
              src: ['sounds/5678.mp3']
            });
            soundnoon.play();
          }else if(employee.time_clock == "เย็น"){
            const soundnoon = new Howl({
              src: ['sounds/5678.mp3']
            });
            soundnoon.play();
          }else {
            console.log(err);
          }

          (async () => {
            try {
              const response = await axios.post('http://localhost:3001/sound', {
                pill_name: employee.pill_name,
                meal: employee.meal,
                email: employee.email
              });
              console.log('Backend response:', response.data); // Handle successful response (optional)
            } catch (error) {
              console.error('Error sending data to backend:', error); // Handle errors
            }
          })();

          setTimeout(() => {
            setShowNotification(false);
            window.location.reload();
          }, 5500);
        }}






      });
    }, 20000);
    return () => clearInterval(intervalId);
  }, [filteredList]);

  const handleCloseNotification = async () => {
      const SUser = localStorage.getItem("user");
      const PUser = JSON.parse(SUser);
      await axios.post('http://localhost:3001/linenoti', {
        text: "กินยาเรียบร้อยแล้ว!!!!!!!!",
        email: PUser
      });
  };

  const deletefunction = (time_id) => {
    axios.delete(`http://localhost:3001/delete/${time_id}`).then((response) => {
      // อัปเดต employeeList โดยตัดข้อมูลที่มี time_id ตรงกับพารามิเตอร์ออก
      setEmployeeList(prevList => prevList.filter((val) => val.time_id !== time_id));
    }).catch((error) => {
      console.error('Error deleting data:', error);
      toast.error('Error deleting data. Please try again later.');
    });
    window.location.reload();
  };
  
  const updatefunctionOFF = (time_id) => {
    axios.put("http://localhost:3001/updateoff",{state_noti: "ปิด", time_id: time_id}).then((response) => {
      // อัปเดต employeeList โดยตัดข้อมูลที่มี time_id ตรงกับพารามิเตอร์ออก
      setEmployeeList(
        employeeList.map((val) => {
          return val.time_id == time_id ? {
            time_id: val.time_id,
            hour: val.hour,
            pill_name: val.pill_name,
            meal: val.meal,
            time_clock: val.time_clock,
            email: val.email,
            state_noti: "ปิด"
          } : val;
        })
      )
    })
    window.location.reload();
  };

  const updatefunctionOn = (time_id) => {
    axios.put("http://localhost:3001/updateon",{state_noti: "เปิด", time_id: time_id}).then((response) => {
      // อัปเดต employeeList โดยตัดข้อมูลที่มี time_id ตรงกับพารามิเตอร์ออก
      setEmployeeList(
        employeeList.map((val) => {
          return val.time_id == time_id ? {
            time_id: val.time_id,
            hour: val.hour,
            pill_name: val.pill_name,
            meal: val.meal,
            time_clock: val.time_clock,
            email: val.email,
            state_noti: "เปิด"
          } : val;
        })
      )
    })
    window.location.reload();
  };

  return (
    <div className='w-screen h-screen bg-blue-500'>
        {/* Render ToastContainer outside of any conditional block for consistent display */}
        <ToastContainer />
          <div className='flex flex-col my-0 mx-auto items-center rounded-t-3xl bg-blue-500'>
            <Navbar />
            <div className='mt-24'></div>
            {/* แสดงเฉพาะข้อมูลที่กรอง */}
            {filteredList
            .sort((a, b) => {
              // แปลงเวลาในรูป HH:mm เป็นชั่วโมงเพื่อเปรียบเทียบ
              const [hourA, minuteA] = a.hour.split(':').map(Number);
              const [hourB, minuteB] = b.hour.split(':').map(Number);

              // เรียงข้อมูลจากเวลาน้อยไปมาก
              if (hourA !== hourB) {
                return hourA - hourB;
              } else {
                return minuteA - minuteB;
              }
            })
            .map((val, key) => (
              <div key={key}>
                <div className="bg-white rounded-lg shadow-md mt-3">
                  <div className="flex flex-col justify-center px-6 py-4">
                    <div className='flex' >
                      <button className='flex items-center text-gray-70 text-white text-sm font-semibold rounded-xl mt-2 px-4 py-1 self-center bg-green-700' onClick={() => {updatefunctionOn(val.time_id)}}>Turn on</button>
                      <button className='flex items-center text-gray-70 text-white text-sm font-semibold rounded-xl mt-2 ml-2 px-4 py-1 self-center bg-red-500' onClick={() => {updatefunctionOFF(val.time_id)}}>Turn off</button>
                      <p className="font-semibold text-gray-700 mt-2 ml-2 text-md">การแจ้งเตือน{val.state_noti}อยู่</p>
                    </div>


                    <h5 className="font-bold text-xl mb-2 self-center mt-2">เวลาที่กินยา {val.hour}</h5>
                    <h5 className="font-bold text-xl mb-2 self-center">ชื่อยา: {val.pill_name}</h5>
                    <p className="font-semibold text-gray-700 self-center text-lg">กิน{val.meal}</p>
                    <p className="font-semibold text-gray-700 self-center text-lg">กินตอน{val.time_clock}</p>
                    <button className='flex items-center text-gray-70 text-white font-semibold rounded-xl mt-2 px-4 py-1 self-center bg-red-500' onClick={() => {deletefunction(val.time_id)}} >Delete</button>
                  </div>
                </div>
                <div className='mt-20'></div>
              </div>
            ))}
            <Navbarhome />
          </div>

      {showNotification && (
        <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
          <div className='flex flex-col bg-white p-8 rounded justify-center items-center'> 
            <p className='text-black font-black font-sans text-xl'>ถึงเวลาทานยา {currentPillName} แล้วครับ กิน {currentMeal} นะครับ เวลา {currentHour}</p>
            <button className='bg-green-500 px-4 mt-3 rounded text-white font-black font-sans text-xl' onClick={handleCloseNotification}>กินแล้ว</button>
          </div>
        </div>
      )}

    </div>
  );
}
export default Home;