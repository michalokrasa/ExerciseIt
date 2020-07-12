
import React from 'react';

const AuthContext = React.createContext();

const AUTH_INITIAL_STATE = {
    isAuthenticated: false,
    user: '',
    id: '',
    accessToken: '',
    refreshToken: ''
};

const authContextReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            localStorage.setItem('accessToken', JSON.stringify(action.payload.accessToken));
            localStorage.setItem('refreshToken', JSON.stringify(action.payload.refreshToken));
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                id: action.payload.id,
            };
        case 'RELOG':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                id: action.payload.id,
            };
        case 'LOGOUT':
            localStorage.clear();
            return {
                ...state,
                ...AUTH_INITIAL_STATE
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

const useAuthContext = () => {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within a AuthContextProvider');
    }
    return context;
}

const AuthContextProvider = ({ children }) => {
    const [authState, authDispatch] = React.useReducer(authContextReducer, AUTH_INITIAL_STATE);
    return (
        <AuthContext.Provider value={{
            authState,
            authDispatch
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContextProvider, AUTH_INITIAL_STATE, useAuthContext };
