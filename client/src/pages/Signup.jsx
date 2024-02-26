import React from 'react'
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
            email: values.email,
            password: values.password
          });
    
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
    
              // You might want to handle navigation or state updates in a more React-friendly way
              window.location.reload();
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
  <div className='w-screen h-screen bg-sky-400'>
    <div className='relative max-w-5xl h-full my-0 mx-auto text-center border-4 border-red-500'> 

      <img src='./images/back.png' alt='back' className='w-16 h-16 absolute top-0 left-0' onClick={() => navigate("/")} />
      <div className='textshadow tran top10 left-1/2 absolute text-4xl text-white font-black font-sans'>
        <h1>Sign Up To Your Account</h1>
      </div>
    <Formik
      initialValues={{}}
      onSubmit={handleRegister}
      validationSchema={validationRegister}
    >
      <Form>
        {/*<Field className='shadow-xl tran top23 left-1/2 absolute w-96 h-9 rounded-full' type='text'
          placeholder="    Line ID" name="line_id" />

        <Field className='shadow-xl tran top33 left-1/2 absolute w-96 h-9 rounded-full' type='text'
          placeholder="    Name" name="name" />*/}
      
        <Field className='shadow-xl tran top43 left-1/2 absolute w-96 h-9 rounded-full' type='email'
          placeholder="    Email" name="email" />
        <ErrorMessage
          component="span"
          name="email"
          className="form-error"
        />

        <Field className='shadow-xl tran top53 left-1/2 absolute w-96 h-9 rounded-full' type='password'
          placeholder="    Password" name="password" />
        <ErrorMessage
          component="span"
          name="password"
          className="form-error"
        />

        <Field className='shadow-xl tran top63 left-1/2 absolute w-96 h-9 rounded-full' type='password'
          placeholder="    Confirm Password" name="confirmpassword" />
        <ErrorMessage
          component="span"
          name="confirmpassword"
          className="form-error"
        />

        {/*<input className='tran top71 left34 absolute w-6 h-6 rounded-full' type='checkbox'
          name="check" />
        <nav>
          <Link to="/Rules" className='textshadow1 tran top70point8 left45 absolute text-lg text-white font-black font-sans' target="_blank">I agree all statements</Link>
        </nav>*/}
      
        <button
          className='shadow-xl tran top80 left-1/2 absolute w-48 h-11 bg-white rounded-full text-lg text-sky-400 font-black font-sans'
          type='submit'>Create Account</button>
      </Form>
    </Formik>
    </div>
    <ToastContainer position="top-right"/>
  </div>
  )
}

export default Signup