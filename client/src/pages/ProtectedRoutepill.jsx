import React from 'react'
import { Navigate } from "react-router-dom";
import Pill from './Pill';

function ProtectedRoutepill({ children }) {
    const isLoggedIn = localStorage.getItem("user");

    return (
        <>
            {!isLoggedIn && (
                <Navigate to="/" replace={true} />
            )}
            <Pill />
            
        </>
    )
}

export default ProtectedRoutepill