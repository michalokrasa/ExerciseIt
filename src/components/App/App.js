import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';

import Home from '../Home';
import Dashboard from '../Dashboard';
import LoginScreen from '../LoginScreen/LoginScreen';
import RegisterScreen from '../RegisterScreen';

import Auth from '../../helpers/Auth';

const App = props => {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/login' component={LoginScreen}/>
                <Route path='/register' component={RegisterScreen}/>
                <Route path='/:userName' component={Dashboard}/>
            </Switch>
        </Router>
    );
}

export default App;