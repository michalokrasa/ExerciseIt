import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

import {
    Toolbar,
    Drawer,
    makeStyles,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Collapse
} from "@material-ui/core";

import { 
    MenuBook,
    Bookmark,
    Folder,
    ExpandLess,
    ExpandMore,
    YouTube,
    Link as LinkIcon,
    CollectionsBookmark
} from "@material-ui/icons";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    container: {
        overflow: "auto"
    },
    nested: {
        paddingLeft: theme.spacing(4),
        
    },
}));

const libraryItems = {
    YouTube: { 
        Icon: YouTube, 
        url: "youtube" 
    },
    Books: { 
        Icon: MenuBook,
        url: "books" 
    },
    Externals: { 
        Icon: LinkIcon,
        url: "externals"
    }
}

const SideDrawer = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const match = useRouteMatch();

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper
            }}
        >
            <Toolbar/>
            <div className={classes.container}>
                <List
                    component="nav"
                    aria-labelledby="side-drawer"
                >
                    <ListItem button component={Link} to={`${match.url}`}>
                        <ListItemIcon>
                            <Bookmark />
                        </ListItemIcon>
                        <ListItemText primary="In progress" />
                    </ListItem>
                    <ListItem button onClick={handleClick}>
                        <ListItemIcon>
                            <CollectionsBookmark />
                        </ListItemIcon>
                        <ListItemText primary="Library" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {Object.keys(libraryItems).map((item) => {
                                const { Icon, url } = libraryItems[item];
                                return (
                                    <ListItem button key={item} 
                                        className={classes.nested}
                                        component={Link} 
                                        to={`${match.url}/${url}`}
                                    >
                                        <ListItemIcon >
                                            <Icon/>
                                        </ListItemIcon>
                                        <ListItemText primary={item}/>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Collapse>
                    <ListItem button component={Link} to={`${match.url}/skillsets`}>
                        <ListItemIcon>
                            <Folder />
                        </ListItemIcon>
                        <ListItemText primary="Skillsets" />
                    </ListItem>
                </List>
            </div>
        </Drawer>
    );
};

export default SideDrawer;