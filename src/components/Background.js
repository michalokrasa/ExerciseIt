import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    background: {
        position: "fixed",
        width: "100%",
        height: "100%",
        zIndex: -1,
        fontSize: "600px"
    },
    "@keyframes slideInBottom": {
        from: {
            top: "100vh",
            opacity: 0
        },
        to: {
            top: "50vh",
            opacity: 1
        }
    },
    leftBook: {
        position: "absolute",
        left: "-200px",
        top: "50vh",
        animationName: "$slideInBottom",
        animationDuration: "2s",
        animationDelay: "0.5s",
        animationTimingFunction: "ease-out",
        animationFillMode: "backwards",
        color: theme.palette.grey["200"]
    },
    "@keyframes slideInTop": {
        from: {
            top: "-90vh",
            opacity: 0
        },
        to: {
            top: "-40vh",
            opacity: 1
        }
    },
    rightBook: {
        position: "absolute",
        right: "-200px",
        top: "-40vh",
        animationName: "$slideInTop",
        animationDuration: "2s",
        animationTimingFunction: "ease-out",
        animationDelay: "0.5s",
        animationFillMode: "backwards",
        color: theme.palette.grey["200"]
    }
}));

const Background = props => {
    const classes = useStyles();

    return (
        <div className={classes.background}>
            <FontAwesomeIcon className={classes.leftBook} icon={faBookOpen} />
            <FontAwesomeIcon className={classes.rightBook} icon={faBookOpen} />
        </div>
    );
};

export default Background;