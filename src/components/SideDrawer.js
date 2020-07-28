import React from "react";

import {
    Toolbar,
    Drawer,
    makeStyles,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from "@material-ui/core";

import { 
    MenuBook,
    Bookmark,
    Folder
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
    }
}));

const drawerItems = {
    "In progress": Bookmark,
    "Library": MenuBook,
    "Skillsets": Folder
}

const SourcesTab = () => {
    const classes = useStyles();

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
                <List>
                    {Object.keys(drawerItems).map((item) => {
                        const Icon = drawerItems[item];
                        return (
                            <ListItem button key={item}>
                                <ListItemIcon >
                                    <Icon/>
                                </ListItemIcon>
                                <ListItemText primary={item}/>
                            </ListItem>
                        )
                    })}
                </List>
            </div>
        </Drawer>
    );
};

export default SourcesTab;