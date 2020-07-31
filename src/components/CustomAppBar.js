import React from "react";

import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    makeStyles,
    MenuItem,
    Popper,
    Grow,
    Paper,
    MenuList,
    ClickAwayListener
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
    const [ authState,,, logout ] = useAuth();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const prevOpen = React.useRef(open);

    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
    
        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
      }

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
                    <div>
                        <IconButton
                        ref={anchorRef}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        >
                            <AccountCircle className={classes.accountIcon} />
                        </IconButton>
                        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={handleClose}>Settings</MenuItem>
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </MenuList>
                                </ClickAwayListener>
                            </Paper>
                            </Grow>
                        )}
                        </Popper>
                    </div>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default CustomAppBar;