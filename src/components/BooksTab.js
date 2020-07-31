import React from "react";
import { 
    Paper,
    Typography 
} from "@material-ui/core";


const BooksTab = () => {
    return (
        <>
        <Typography variant="h4" gutterBottom>
            Books
        </Typography>
        <Paper>
            Hello from books tab.
        </Paper>
        </>
    );
}

export default BooksTab;