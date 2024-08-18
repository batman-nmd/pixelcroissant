import React, { useState, useEffect } from 'react';
import Login from '../auth/Login';
import Register from '../auth/Register';

function HomePage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Optionally, you could verify the token with the server
            setIsAuthenticated(true);
        }
    }, []);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <div>
            <h1>Welcome to PixelCroissant</h1>
            {isAuthenticated ? (
                <div>
                    <p>Start creating your custom patterns!</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <Login onLoginSuccess={handleLoginSuccess} />
                    <Register />
                </div>
            )}
        </div>
    );
}

export default HomePage;
