import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ErrorMessage, Formik, Form, Field } from "formik";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from "yup";

function Login() {

  const isLoggedIn = localStorage.getItem("@user");


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

            localStorage.setItem('@user', JSON.stringify(response.config.data))
            // You might want to handle navigation or state updates in a more React-friendly way
            window.location.reload();
            
        } else {
            // Handle unexpected response format
            console.error("Unexpected response format:", response);
        }
    } catch (error) {
        // Handle network errors or other issues
        console.error("Error during login:", error);
        toast.error("Error during login", {
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
        .email("Email invalid")
        .required("Email is required"),
    password: yup
        .string()
        .min(6, "Password must be at least 6 characters long")
        .required("Password is required"),
})

let navigate = useNavigate()

return (
  <div className='w-screen h-screen bg-sky-400'>
    <div className='relative max-w-5xl h-full my-0 mx-auto text-center border-4 border-red-500'>

      <div className='tran top18 left-1/2 absolute h-36 w-36'>
        <img src="images/logo.png" alt="logo" />
      </div>

      <div className='textshadow tran top35 left-1/2 absolute text-3xl text-white font-black font-sans'>
        <h1>
          NEVER FORGET
        </h1>
      </div>

      <Formik
        initialValues={{}}
        onSubmit={handleLogin}
        validationSchema={validationLogin}
        >
        <Form>
          <Field className='shadow-xl tran top45 left-1/2 absolute w-96 h-9 rounded-full' type='email'
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
          <button
            className='shadow-xl tran top65 left61 absolute w-32 h-9 bg-white rounded-full text-sky-400 font-black font-sans'
            type='submit'>Login</button>
        </Form>
      </Formik>
      <ToastContainer position='top-right' />
      
      <button onClick={() => navigate("/signup")}
            className='shadow-xl tran top65 left40 absolute w-32 h-9 bg-white rounded-full text-sky-400 font-black font-sans'
      >Sign Up</button>
    </div>
  </div>
)
}

export default Login