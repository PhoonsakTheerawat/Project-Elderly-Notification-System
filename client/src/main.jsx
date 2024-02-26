import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter,RouterProvider} from 'react-router-dom'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Rules from './pages/Rules.jsx'
import homepage from './pages/homepage.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element:<App />
  },

  {
    path: "/login",
    element: <Login />
  },
  
  {
    path:"/signup",
    element:<Signup/>
  },

  {
    path:"/rules",
    element:<Rules />
       
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
