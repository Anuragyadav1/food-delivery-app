// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../../context/ContextStore'; // Adjust the import path

const ProtectedRoute = ({ children }) => {
    const { token } = useContext(StoreContext); // Check the token from your context

    if (!token) {
        // If no token, redirect to the login page
        return <Navigate to="/" replace />;
    }

    // If logged in, render the children (protected component)
    return children;
};

export default ProtectedRoute;
