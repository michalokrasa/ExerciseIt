import React, { useState, createContext, useContext } from "react";

const AuthContext = createContext();

const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within a AuthProvider");
    }

    return [
        context.authState, 
        context.setAuthState, 
        context.isAuthenticated, 
        context.logout
    ];
}

const AuthProvider = ({ children }) => {
    const accessToken = localStorage.getItem("accessToken");
    const expiresAt = localStorage.getItem("expiresAt");
    const userInfo = localStorage.getItem("userInfo");
    const [ authState, setAuthState ] = useState({
        accessToken,
        expiresAt,
        userInfo: userInfo ? JSON.parse(userInfo) : {}
    });

    const setAuthInfo = ({ accessToken, userInfo, expiresAt }) => {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        localStorage.setItem("expiresAt", expiresAt);
        setAuthState({
            accessToken,
            userInfo,
            expiresAt
        });
    };

    const isAuthenticated = () => {
        if (!authState.accessToken || !authState.expiresAt) {
            return false;
        }

        return new Date().getTime() / 1000 < authState.expiresAt;
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userInfo");
        localStorage.removeItem("expiresAt");
        setAuthState({
            accessToken: null,
            expiresAt: null,
            userInfo: {}
        });
    };

    return (
        <AuthContext.Provider value={{
            authState,
            setAuthState: authInfo => setAuthInfo(authInfo),
            isAuthenticated,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, useAuth };
