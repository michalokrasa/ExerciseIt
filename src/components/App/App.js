import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch, Redirect, Link, HashRouter } from 'react-router-dom';

import Home from '../Home';
import Dashboard from '../Dashboard';
import AuthenticationScreen from '../AuthenticationScreen';

const App = props => {
    return (
        <HashRouter>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/login' component={AuthenticationScreen}/>
                <Route path='/register' component={AuthenticationScreen}/>
                <Route path='/:userName' component={Dashboard}/>
            </Switch>
        </HashRouter>
    );
}

export default App;