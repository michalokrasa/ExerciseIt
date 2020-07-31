import React from "react";
import { 
    Paper,
    Typography 
} from "@material-ui/core";


const InProgressTab = () => {
    return (
        <>
        <Typography variant="h4" gutterBottom>
            In progress
        </Typography>
        <Paper>
            Hello from in progress tab.
        </Paper>
        </>
    );
}

export default InProgressTab;