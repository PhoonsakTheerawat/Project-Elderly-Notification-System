import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ErrorMessage, Formik, Form, Field } from "formik";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from "yup";
import { Navigate } from "react-router-dom";

function Login() {
  const isLoggedIn = localStorage.getItem("user");

  const handleLogin = async (values) => {
    try {
        const response = await axios.post('http://localhost:3001/login', {
            email: values.email,
            password: values.password
        });

        console.log(response.data)

        // Check if the response contains the expected message
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
            
            localStorage.setItem('user', JSON.stringify(values.email))
            // You might want to handle navigation or state updates in a more React-friendly way
            window.location.reload();
            
        
        } else {
            // Handle unexpected response format
            console.error("Unexpected response format:", response);
        }
    } catch (error) {
        // Handle network errors or other issues
        console.error("Error during login:", error);
        toast.error("เข้าสู่ระบบล้มเหลว", {
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

const validationLogin = yup.object().shape({
    email: yup
        .string()
        .email("รูปแบบ Email ไม่ถูกต้อง")
        .required("โปรดกรอก Email ของคุณ"),
    password: yup
        .string()
        .min(6, "รหัสต้องมีความยาว 6 ตัวอักสรขึ้นไป")
        .required("โปรดกรอก Password ของคุณ"),
})

let navigate = useNavigate()

return (
<div>
  {isLoggedIn && (
      <Navigate to="/home" replace={true} />
  )}
  <div className='w-screen h-screen' style={{ backgroundImage: 'linear-gradient(to bottom, #003366, #00539e, #0077cc)' }}>
    <div className='flex flex-col max-w-5xl h-full my-0 mx-auto items-center '>

      <div className='h-auto w-auto mt-28 '>
        <img src="images/logo.png" alt="logo" />
      </div>

      <div className='textshadow text-3xl text-white font-black font-sans h-auto w-auto mt-5 '>
        <h1>
          NEVER FORGET
        </h1>
      </div>

      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={handleLogin}
        validationSchema={validationLogin}
        >
        <Form className='flex flex-col'>
    
          <div className='mt-7 '>
            <Field className='shadow-xl w-96 h-9 rounded-lg' type='email'
              placeholder="    Email" name="email" />
          </div>
          <ErrorMessage 
                    component="span"
                    name="email"
                    className="form-error text-white font-black font-sans text-lg"
          />

          <div className='mt-7 '>
            <Field className='shadow-xl w-96 h-9 rounded-lg' type='password'
              placeholder="    Password" name="password" />
          </div>
          <ErrorMessage 
                    component="span"
                    name="password"
                    className="form-error text-white font-black font-sans text-lg"
          />  

          <div className='flex justify-evenly mt-7 '>
            <button onClick={() => navigate("/signup")}
              className='shadow-xl w-32 h-9 bg-white rounded-full text-sky-400 font-black font-sans'
              >Sign Up</button>
              
            <button
              className='shadow-xl w-32 h-9 bg-white rounded-full text-sky-400 font-black font-sans'
              type='submit'>Login</button>

          </div>

        </Form>
      </Formik>
      <ToastContainer position='top-right' />
      
      {/*<button onClick={() => navigate("/signup")}
            className=' shadow-xl w-32 h-9 bg-white rounded-full text-sky-400 font-black font-sans'
      >Sign Up</button>*/}
    </div>
  </div>
</div>
)
}

export default Login