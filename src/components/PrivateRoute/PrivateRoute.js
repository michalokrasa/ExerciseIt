import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import { useAuthContext } from '../../contexts/AuthContext';

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
const PrivateRoute = ({ component, computedMatch, ...rest }) => {
    const { authState, authDispatch } = useAuthContext();

    useEffect(() => {
        const localUser = JSON.parse(localStorage.getItem('user'));
        const localAccessToken = JSON.parse(localStorage.getItem('accessToken'));

        if (localUser && authState.isAuthenticated === false) {      
            // change url to const from config/const.js
            const verifyCall = async () => 
                await axios.post('http://localhost:8080/api/auth/verifyToken', { accessToken: localAccessToken })
                    .then(res => {
                        const { id, userName } = res.data;

                        if (localUser === userName) {
                            authDispatch({ 
                                type: 'RELOG', 
                                payload: { user: userName, id }
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err.response);
                        
                        if (err.response.data.name === "TokenExpiredError") {
                            console.log("Access token expired");
                            refreshCall(authDispatch);
                        }
                        else {
                            console.log('Access denied with err: ' + err.response.data);
                            authDispatch({ type: 'LOGOUT' });
                        }
                    });

            verifyCall();
        }
    });

    return (
        authState.isAuthenticated && computedMatch.params.userName === authState.user ? (
            <Route component={component} {...rest} />
        ) : (
                <Redirect to={{
                    pathname: '/login'
                }} />
            )
    )
};

const refreshCall = async (authDispatch) => {
    const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
    console.log('refresh call');
    

    await axios.post('http://localhost:8080/api/auth/refresh', { refreshToken })
        .then(res => {
            const { accessToken } = res.data;
            console.log("refresh resp: " + res.data);
            localStorage.setItem('accessToken', JSON.stringify(accessToken));
        })
        .catch(err => {
            if (err.response.data.name === "TokenExpiredError") {
                console.log("Refresh token expired");
            }
            console.log('Access denied with err: ' + err.response.data);
            authDispatch({ type: 'LOGOUT' });
        });
}

export default PrivateRoute;