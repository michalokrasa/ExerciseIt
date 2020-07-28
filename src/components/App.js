import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard";
import AuthenticationScreen from "./AuthenticationScreen";
import PrivateRoute from "./PrivateRoute";
import { useAuth } from "../contexts/AuthContext";


const App = props => {
    const [ ,, isAuthenticated ] = useAuth();

    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signin">
            { isAuthenticated() ? 
                <Redirect to={{pathname: "/dashboard", state: { from: props.location}}}/> 
                : 
                <AuthenticationScreen/>
            }   
            </Route>
            <Route exact path="/signup"> 
            { isAuthenticated() ? 
                <Redirect to={{pathname: "/dashboard", state: { from: props.location}}}/> 
                : 
                <AuthenticationScreen/>
            }  
            </Route>
            <PrivateRoute path="/dashboard" component={Dashboard}/>
            <Redirect path="*" to={{pathname: "/", state: { from: props.location}}}/>
        </Switch>           
    );
}

export default App;