import React from "react";

import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    makeStyles,
    Menu,
    Collapse,
    MenuItem
} from "@material-ui/core";

import {
    AccountCircle
} from "@material-ui/icons";

import { useAuth } from "../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    themedColor: {
        color: theme.palette.secondary.main
    },
    accountToolbar: {
        display: "flex", 
        flexGrow: 1, 
        justifyContent: "flex-end",
        alignItems: "center"
    },
    accountIcon: {
        fontSize: "1.5em"
    },
    menuPaper: {
        transform: "translateX(-25%) translateY(30%)"
    }
}));

const CustomAppBar = () => {
    const classes = useStyles();
    const [anchorAccountMenu, setAnchorAccountMenu] = React.useState(null);
    const menuOpen = Boolean(anchorAccountMenu);
    const [ authState,,, logout ] = useAuth();

    const handleClose = () => {
        setAnchorAccountMenu(null);
    };

    const handleLogout = () => {
        logout();
    }

    return (
        <AppBar className={classes.appBar} position="fixed">
            <Toolbar >
                <Typography variant="h3">
                    Exercise
                </Typography>
                <Typography className={classes.themedColor} variant="h3">
                    IT
                </Typography>
                <div className={classes.accountToolbar}>
                    <Typography variant="h5">
                        Hi {authState.userInfo.username}!
                    </Typography>
                    <IconButton aria-controls="account-menu" aria-haspopup="true" onClick={event => setAnchorAccountMenu(event.currentTarget)}>
                        <AccountCircle className={classes.accountIcon} />
                    </IconButton>
                    <Menu
                        id="account-menu"
                        anchorEl={anchorAccountMenu}
                        keepMounted
                        open={menuOpen}
                        onClose={handleClose}
                        TransitionComponent={Collapse}
                        classes={{
                            paper: classes.menuPaper
                        }}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>Settings</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default CustomAppBar;