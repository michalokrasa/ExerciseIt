import React from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";


const ErrorSnack = ({children, error, setError}) => {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
          }

          setError(false);
    };

    return (
        <Snackbar 
            open={error} 
            autoHideDuration={6000} 
            onClose={handleClose}
            anchorOrigin={{vertical: "top", horizontal: "center"}}
        >
            <Alert onClose={handleClose} severity="error">
                { children }
            </Alert>
        </Snackbar>
    )
}

export default ErrorSnack;