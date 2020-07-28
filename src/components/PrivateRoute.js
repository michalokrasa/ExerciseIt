import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ component, computedMatch, ...rest }) => {
    const [ ,, isAuthenticated ] = useAuth();

    return (
        isAuthenticated() ? (
            <Route component={component} {...rest} />
        ) : (
            <Redirect to={{
                pathname: "/login"
            }} />
        )
    )
};

export default PrivateRoute;