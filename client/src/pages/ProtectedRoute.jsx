import React from 'react'
import { Navigate } from "react-router-dom";
import Home from './Home';

function ProtectedRoute({ children }) {
    const isLoggedIn = localStorage.getItem("user");

    return (
        <>
            {!isLoggedIn && (
                <Navigate to="/" replace={true} />
            )}
            <Home />
            
        </>
    )
}

export default ProtectedRoute