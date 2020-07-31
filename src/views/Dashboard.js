import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import SideDrawer from "../components/SideDrawer";
import CustomAppBar from "../components/CustomAppBar";

import {
    makeStyles,
    Toolbar
} from "@material-ui/core";

import InProgressTab from "../components/InProgessTab";
import SkillsetTab from "../components/SkillsetTab";
import YouTubeTab from "../components/YouTubeTab";
import BooksTab from "../components/BooksTab";
import ExternalsTab from "../components/ExternalsTab";

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

    const match = useRouteMatch();

    return (
        <div className={classes.root}>
            <CustomAppBar/>
            <SideDrawer/>
            <main className={classes.content}>
                <Toolbar/>
                <Switch>
                    <Route path={`${match.url}`} exact>
                        <InProgressTab />
                    </Route>
                    <Route path={`${match.url}/youtube`} exact>
                        <YouTubeTab />
                    </Route>
                    <Route path={`${match.url}/books`} exact>
                        <BooksTab />
                    </Route>
                    <Route path={`${match.url}/externals`} exact>
                        <ExternalsTab />
                    </Route>
                    <Route path={`${match.url}/skillsets`} exact>
                        <SkillsetTab />
                    </Route>
                </Switch>
            </main>
        </div>
    );
}

export default Dashboard;