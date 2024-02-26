import React from 'react'
import { Navigate } from "react-router-dom";
import { Rule } from './Rules';

function ProtectedRoute({ children }) {
    const isLoggedIn = localStorage.getItem("@user");

    return (
        <>
            {!isLoggedIn && (
                <Navigate to="/login" replace={true} />
            )}
            <Rule />
        </>
    )
}

export default ProtectedRoute