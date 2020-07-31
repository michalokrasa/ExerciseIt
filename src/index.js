import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { AuthProvider } from "./contexts/AuthContext";
import { FetchProvider } from "./contexts/FetchContext";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#7c95e6" //"#BDCCFF"
        },
        secondary: {
            main: "#7EB3FF"
        },
        error: {
            main: "#EE3D48"
        }
    },
    typography: {
        fontFamily: [
            "Sora", 
            "sans-serif"
        ].join(","),
    }
});

ReactDOM.render(
    <React.StrictMode>
        <CssBaseline>
            <AuthProvider>
                <FetchProvider>
                    <ThemeProvider theme={theme}>
                        <HashRouter>
                            <App />
                        </HashRouter>
                    </ThemeProvider>
                </FetchProvider>
            </AuthProvider>
        </CssBaseline>
    </React.StrictMode>,
    document.getElementById("root")
);