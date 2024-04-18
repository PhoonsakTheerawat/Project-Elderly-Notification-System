import React from 'react'
import { Navigate } from "react-router-dom";
import Time from './Time';

function ProtectedRoutetime({ children }) {
    const isLoggedIn = localStorage.getItem("user");

    return (
        <>
            {!isLoggedIn && (
                <Navigate to="/" replace={true} />
            )}
            <Time />
            
        </>
    )
}

export default ProtectedRoutetime