import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const login = (newToken) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
