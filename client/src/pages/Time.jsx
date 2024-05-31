import React, { useState, useEffect } from 'react'; // Import React and hooks
import Navbar from './Navbar'; // Import Navbar component
import Navbartime from './Navbartime'; // Import Navbartime component
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ErrorMessage, Formik, Form, Field } from "formik";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from "yup";

function Time() {
  const [time, setTime] = useState(new Date()); // Set initial state for time

  useEffect(() => {
    const intervalId = setInterval(() => { // Use a more descriptive variable name
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup function to prevent memory leaks
  }, []); // Empty dependency array to run the effect only once after component mounts

  const options = {
    year: 'numeric',
    month: 'long', // Corrected typo (month instead of mouth)
    day: 'numeric',
    weekday: 'long',
  };

  const dateString = time.toLocaleDateString('en-US', options); // Corrected call

  const handleTime = async (values) => {
    try {
        const userEmail = localStorage.getItem('user');
        const parsedUser = JSON.parse(userEmail);

        const response = await axios.post('http://localhost:3001/time', {       
          hour: values.hour,
          pill_name: values.pill_name,
          meal: values.meal,  
          time_clock: values.time_clock,
          email: parsedUser,
        });

        if (response.data && response.data.msg) {
            toast.info(response.data.msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
  
            // You might want to handle navigation or state updates in a more React-friendly way
            {/*window.location.reload();*/}
            navigate('/home');
        } else {
            // Handle unexpected response format
            console.error("Unexpected response format:", response);
        }
    } catch (error) {
        // Handle network errors or other issues
        console.error("Error during registration:", error);
        toast.error("Error during registration", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
        });
    }
};

const validationTime = yup.object().shape({
  hour: yup
      .string()
      .required("Hour is required"),
  
  pill_name: yup
      .string()
      .required("Pill Name is required"),
  meal: yup
      .string()
      .required("Meal is required"),  
  time_clock: yup
      .string()
      .required("TIme is required")
})

let navigate = useNavigate()


  return (
    <div className='w-screen h-screen'>
      <div className='flex flex-col max-w-auto h-full my-0 mx-auto items-center bg-white rounded-t-3xl' style={{ backgroundImage: 'linear-gradient(to bottom, #003366, #00539e, #0077cc)' }}>
        <Navbar />
        <h1 className='mt-24 text-white font-black font-sans text-5xl'>{time.toLocaleTimeString('en-US', { hour12: false })}</h1>
        <p className='mt-2 text-white font-sans text-2xl'>{dateString}</p>

        <Formik
          initialValues={{ hour: '', pill_name: '', meal: '', time_clock: '' }}
          onSubmit={handleTime}
          validationSchema={validationTime}
        >
          <Form>
          <div className="box-border h-2/4 w-96 w-auto h-auto border-blue-500 rounded-lg flex flex-col justify-start items-center mt-10 p-8">
            <div className='flex justify-center mt-10'>
              <Field className='rounded-2xl w-auto h-16 font-black font-sans text-3xl border-2 border-black p-2'
                  type="time"
                  id="hour"
                  name="hour"
                  placeholder="00"
                  min="0"
                  max="23"
              />
            </div>
            <div className="flex flex-col mt-8 h-auto">
                <Field
                  className='shadow-xl mt-10 w-80 h-9 rounded-full text-center bg-white text-black font-black font-sans'
                  type='text'
                  name="pill_name"
                  placeholder='กรอกชื่อยา'
                />
        
                <Field
                  className='shadow-xl mt-10 w-80 h-9 rounded-full text-center bg-white text-black font-black font-sans'
                  as='select'
                  name="meal"
                >
                  <option value=''>กินยาก่อนอาหาร หรือ หลังอาหาร</option>
                  <option value='ก่อนอาหาร'>ก่อนอาหาร</option>
                  <option value='หลังอาหาร'>หลังอาหาร</option>
    
                </Field>


                <Field
                  className='shadow-xl mt-10 w-80 h-9 rounded-full text-center bg-white text-black font-black font-sans'
                  as='select'
                  name="time_clock"
                >
                  <option value=''>เวลาในการกินยา</option>
                  <option value='เช้า'>เช้า</option>
                  <option value='กลางวัน'>กลางวัน</option>
                  <option value='เย็น'>เย็น</option>
                </Field>
                <div className='shadow-xl mt-10 w-80 h-9 rounded-full text-center bg-white text-lg text-black font-black font-sans'>
                  <button type='submit' >
                    Submit
                  </button>
                </div>
            </div>
          </div>
          </Form>
        </Formik>
        <Navbartime />
      </div>
    </div>
  );
}

export default Time;
