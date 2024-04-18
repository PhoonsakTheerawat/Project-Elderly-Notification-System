import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter,RouterProvider} from 'react-router-dom'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Rules from './pages/Rules.jsx'
import Home from './pages/Home.jsx'
import Time from './pages/Time.jsx'
import Pill from './pages/Pill.jsx'
import Sound from './pages/Sound.jsx'
import Camera from './pages/Camera.jsx'
import ProtectedRoute from './pages/ProtectedRoute.jsx'
import ProtectedRoutetime from  './pages/ProtectedRoutetime.jsx'
import ProtectedRoutepill from './pages/ProtectedRoutepill.jsx'
import ProtectedRoutesound from './pages/ProtectedRoutesound.jsx'
import ProtectedRoutecamera from './pages/ProtectedRoutecamera.jsx'

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
       
  },

  {
    path:"/home",
    element:<ProtectedRoute>
              <Home/>
            </ProtectedRoute>
  },

  {
    path:"/time",
    element:<ProtectedRoutetime>
              <Time/>
            </ProtectedRoutetime>
  },

  {
    path:"/pill",
    element:<ProtectedRoutepill>
              <Pill/>
            </ProtectedRoutepill>
  },

  {
    path:"/sound",
    element:<ProtectedRoutesound>
              <Sound/>
            </ProtectedRoutesound>
  },

  {
    path:"/camera",
    element:<ProtectedRoutecamera>
              <Camera/>
            </ProtectedRoutecamera>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
