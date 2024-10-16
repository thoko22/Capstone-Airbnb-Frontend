// AuthContext.js
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isHostLoggedIn, setIsHostLoggedIn] = useState(false);

    const loginUser = (token) => {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
    };

    const loginHost = (token) => {
        localStorage.setItem('hostToken', token);
        setIsHostLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('hostToken');
        setIsLoggedIn(false);
        setIsHostLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, isHostLoggedIn, loginUser, loginHost, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};