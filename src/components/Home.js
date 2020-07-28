import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import Background from "./Background";

import {
    makeStyles, 
    Typography,
    Button,
    AppBar,
    Toolbar,
    useScrollTrigger,
    useMediaQuery
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    center: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        minHeight: 600,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1
    },
    mainContainer: {
        display: "flex",
        flexDirection: "column",
        fontSize: 32,
        [theme.breakpoints.only("xs")]: {
            width: 300
        }
    },
    emphasis: {
        fontWeight: "bold",
        fontStyle: "italic"
    },
    title: {
        textAlign: "center",
        fontSize: theme.typography.h4.fontSize,
        [theme.breakpoints.up("sm")]: {
            fontSize: theme.typography.h3.fontSize
        },
        [theme.breakpoints.up("md")]: {
            fontSize: theme.typography.h2.fontSize
        },
    },
    titleIcon: {
        fontSize: 80,
        textAlign: "center",
        color: theme.palette.primary.main,
        [theme.breakpoints.up("sm")]: {
            fontSize: 120
        },
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    mainButtonsContainer: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        fontSize: "1em"
    },
    mainButton: {
        flex: "1 1 200px",
        fontSize: "0.5em",
        margin: "15px 15px",
        textAlign: "center",
    },
    discoverButton: {
        backgroundColor: theme.palette.secondary.main,
        "&:hover": {
            backgroundColor: theme.palette.secondary.light
        }
    },
    appBarContainer: {
        justifyContent: "space-between",
    },
    appBarButtons: {
        borderRadius: "25px",
        fontSize: "0.8rem",
        [theme.breakpoints.up("sm")]: {
            fontSize: "1rem",
            margin: theme.spacing(1)
        }
    },
    logoText: {
        fontSize: "1.2rem",
        [theme.breakpoints.up("sm")]: {
            fontSize: "2rem"
        },
        [theme.breakpoints.up("md")]: {
            fontSize: "3rem"
        }
    }
}));

const ElevationScroll = ({ children }) => {
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
      color: trigger ? "inherit" : "transparent",
    });
}

const ResponsiveButton = (props) => {
    const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down("xs"), {noSsr: true});
    
    return (
        <Button {...props} variant={isSmallScreen ? "text" : "contained"}>
          {props.children}
        </Button>
    );
};


const Home = props => {
    const classes = useStyles();

    return (
        <>
        <ElevationScroll>
            <AppBar elevation={0} color="transparent">
                <Toolbar className={classes.appBarContainer}>
                    <Typography className={classes.logoText}>
                        ExerciseIT
                    </Typography>
                    <div>
                        <ResponsiveButton className={classes.appBarButtons} color="secondary" component={Link} to="/signup">
                            Sign Up
                        </ResponsiveButton>
                        <ResponsiveButton className={classes.appBarButtons} color="secondary" component={Link} to="/signin">
                            Sign In
                        </ResponsiveButton>
                    </div>
                </Toolbar>
            </AppBar>
        </ElevationScroll>
        <div className={classes.center}>
            <main className={classes.mainContainer}>
                <Typography variant="h1" className={classes.title}>Manage all your</Typography>
                <Typography variant="h1" className={clsx(classes.emphasis, classes.title)}>knowledge</Typography>
                <Typography variant="h1" className={classes.title}>from one place</Typography>
                <div className={classes.titleIcon}>
                    <FontAwesomeIcon icon={faBookOpen}/>
                </div>
                <div className={classes.mainButtonsContainer}>
                    <Button className={clsx(classes.mainButton, classes.discoverButton)} color="secondary" variant="contained" component={Link} to="/">
                        Discover ExerciseIT
                    </Button>
                </div>
            </main>
        </div>
        <Background/>
        </>
    );
}


export default Home;