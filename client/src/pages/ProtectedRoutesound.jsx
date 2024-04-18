import React from 'react'
import { Navigate } from "react-router-dom";
import Sound from './Sound';

function ProtectedRoutesound({ children }) {
    const isLoggedIn = localStorage.getItem("user");

    return (
        <>
            {!isLoggedIn && (
                <Navigate to="/" replace={true} />
            )}
            <Sound />
            
        </>
    )
}

export default ProtectedRoutesound