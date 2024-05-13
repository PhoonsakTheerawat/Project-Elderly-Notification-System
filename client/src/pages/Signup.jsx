import React , { useState }  from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ErrorMessage, Formik, Form, Field } from "formik";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from "yup";

function Signup({ isLoggedIn = false }) {
    
  const handleRegister = async (values) => {
      try {
          const response = await axios.post('http://localhost:3001/signup', {
            name: values.name,
            line_id: values.line_id,
            email: values.email,
            password: values.password  
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
              navigate('/');
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

  const validationRegister = yup.object().shape({
    name: yup
        .string()
        .required("Name is required"),
    line_id: yup
        .string()
        .required("Line ID is required"),
    email: yup
        .string()
        .email("Email invalid")
        .required("Email is required"),
    password: yup
        .string()
        .min(6, "Password must be at least 6 characters long")
        .required("Password is required"),
    confirmpassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "The passwords are different")
        .required("Password confirmation is mandatory")
  })

  let navigate = useNavigate()

  return (
  <div className='w-screen h-screen ' style={{ backgroundImage: 'linear-gradient(to bottom, #003366, #00539e, #0077cc)' }}>
    <div className='flex flex-col max-w-5xl h-full my-0 mx-auto items-center border-4 border-red-500'>

      <div className='flex justify-start w-full mt-10'>
        <img src='./images/back.png' alt='back' className='w-16 h-16 mr-2 md:mr-24 lg:mr-56' onClick={() => navigate("/")} />
        <div className='self-center textshadow text-4xl text-white font-black font-sans'>
          <h1>Sign Up To Your Account</h1>
        </div>
      </div>

    <Formik
      initialValues={{ name: '', line_id: '', email: '', password: '', confirmpassword: '' }}
      onSubmit={handleRegister}
      validationSchema={validationRegister}
    >
      <Form>
        <div className='mt-32'>
          <Field className='shadow-xl w-96 h-9 rounded-lg' type='text'
            placeholder="    Name" name="name" />
        </div>
        <ErrorMessage
          component="span"
          name="name"
          className="form-error text-white font-black font-sans text-lg"
        />

        <div className='mt-8'>
          <Field className='shadow-xl w-96 h-9 rounded-lg' type='text'
            placeholder="    Line ID" name="line_id" />
        </div>
        <ErrorMessage
          component="span"
          name="line_id"
          className="form-error text-white font-black font-sans text-lg"
        />

        <div className='mt-8'>
          <Field className='shadow-xl w-96 h-9 rounded-lg' type='email'
            placeholder="    Email" name="email" />
        </div>
        <ErrorMessage
          component="span"
          name="email"
          className="form-error text-white font-black font-sans text-lg"
        />

        <div className='mt-8'>
          <Field className='shadow-xl w-96 h-9 rounded-lg' type='password'
            placeholder="    Password" name="password" />
        </div>
        <ErrorMessage
          component="span"
          name="password"
          className="form-error text-white font-black font-sans text-lg"
        />

        <div className='mt-8'>
          <Field className='shadow-xl w-96 h-9 rounded-lg' type='password'
            placeholder="    Confirm Password" name="confirmpassword" />
        </div>
        <ErrorMessage
          component="span"
          name="confirmpassword"
          className="form-error text-white font-black font-sans text-lg"
        />

        <div className='flex items-center mt-3'>
          <Field className='w-6 h-6 rounded-full border-4' type='checkbox'
            name="pdpa" required/>
          <nav>
            <Link to="/Rules" className='p-5 textshadow1 text-lg text-white font-black font-sans' target="_blank">I agree all statements</Link>
          </nav>
        </div>

        <div className='flex justify-center mt-4'>
          <button
            className='shadow-xl w-48 h-11 bg-white rounded-full text-lg text-sky-400 font-black font-sans'
            type='submit'>Create Account</button>
        </div>
      </Form>
    </Formik>
    </div>
    <ToastContainer position="top-right"/>
  </div>
  )
}

export default Signup