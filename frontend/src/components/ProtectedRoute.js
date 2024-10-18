import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useContext(AuthContext);

    // Check if still loading, show a placeholder or loading spinner
    if (loading) {
        return <div>Loading...</div>; // Simple loading UI
    }

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // If authenticated, render child components (Outlet)
    return <Outlet />;
};

export default ProtectedRoute;
