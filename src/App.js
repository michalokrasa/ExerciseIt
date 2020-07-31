import React, { lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { useAuth } from "./contexts/AuthContext";
import Home from "./views/Home";
import AuthenticationScreen from "./views/AuthenticationScreen";
const Dashboard = lazy(() => import("./views/Dashboard"));

const App = props => {
    const [ ,, isAuthenticated ] = useAuth();

    return (
        <Suspense fallback={<div>Lazy loading...</div>}>
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
        </Suspense>       
    );
}

export default App;