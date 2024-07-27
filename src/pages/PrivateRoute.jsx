import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const API_URL = 'http://localhost:8000/api';

const PrivateRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const validateToken = async () => {
            try {
                const response = await axios.get(`${API_URL}/validate-token`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setIsAuthenticated(response.data.valid);
            } catch (error) {
                console.error('Error al validar el token:', error);
                setIsAuthenticated(false);
            }
        };

        if (token) {
            validateToken();
        } else {
            setIsAuthenticated(false);
        }
    }, [token]);

    if (isAuthenticated === null) {
        return <section className='container_balls'>
            <div className="balls">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </section>;
    }

    return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
