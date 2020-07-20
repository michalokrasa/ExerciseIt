import React from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

import Home from '../Home';
import Dashboard from '../Dashboard';
import AuthenticationScreen from '../AuthenticationScreen';
import PrivateRoute from '../PrivateRoute';
import { AuthContextProvider } from '../../contexts/AuthContext';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#eebb00"
        },
        secondary: {
            main: "#8700ee"
        }
    }
});

const App = props => {
    return (
        <AuthContextProvider>
            <ThemeProvider theme={theme}>
                <HashRouter>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/login' component={AuthenticationScreen}/>
                        <Route exact path='/register' component={AuthenticationScreen}/>
                        <PrivateRoute path='/:userName' component={Dashboard}/>
                        <Redirect path='*' to='/'/>
                    </Switch>
                </HashRouter>
            </ThemeProvider>
        </AuthContextProvider>
    );
}

export default App;