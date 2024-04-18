import React from 'react'
import { Navigate } from "react-router-dom";
import Camera from './Camera';

function ProtectedRoutecamera({ children }) {
    const isLoggedIn = localStorage.getItem("user");

    return (
        <>
            {!isLoggedIn && (
                <Navigate to="/" replace={true} />
            )}
            <Camera />
            
        </>
    )
}

export default ProtectedRoutecamera