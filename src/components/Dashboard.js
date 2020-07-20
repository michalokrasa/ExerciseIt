import React from 'react';

import SideDrawer from './SideDrawer';
import CustomAppBar from './AppBar';

import {
    CssBaseline,
    Typography, 
    Paper, 
    makeStyles,
    Toolbar
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    }
}));

const Dashboard = props => {
    const classes = useStyles();

    return (
        <CssBaseline>
            <div className={classes.root}>
                <CustomAppBar/>
                <SideDrawer/>
                <main className={classes.content}>
                    <Toolbar/>
                    <Typography variant="h4" gutterBottom>
                            Let's go!!!
                        </Typography>
                        <Paper>
                            <Typography>
                                CONTENT
                            </Typography>
                        </Paper>
                </main>
            </div>
        </CssBaseline>
    );
}

export default Dashboard;