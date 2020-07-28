import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { Redirect, useRouteMatch, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { publicFetch } from "../util/publicFetch";
import { useAuth } from "../contexts/AuthContext";
import Background from "./Background"; 

import { 
    makeStyles,
    Paper, 
    TextField, 
    Button,
    Typography,
    CircularProgress,
    Link as MuiLink,
    Toolbar,
    InputAdornment,
    IconButton
} from "@material-ui/core";

import { 
    NavigateBefore,
    Visibility,
    VisibilityOff
} from "@material-ui/icons";

import ErrorSnack from "./ErrorSnack";
import tinycolor from "tinycolor2";

// TODO: Add axios-retry

const useStyles = makeStyles(theme => ({
    "center": {
        "display": "grid",
        "placeItems": "center",
        "height": "100vh",
    },
    "mainContainer": {
        "width": "80vw",
        "margin": "30px 0px",
        "padding": theme.spacing(3),
        "display": "flex",
        "flexWrap": "wrap",
        "justifyContent": "space-around",
        "alignItems": "center",
        "backgroundColor": theme.palette.grey["100"],
        [theme.breakpoints.up("md")]: {
            "width": "750px"
        }
    },
    "logo": {
        "fontSize": "150px",
        "display": "block",
        "padding": theme.spacing(2),
        "color": theme.palette.secondary.main,
        [theme.breakpoints.up("sm")]: {
            "fontSize": "200px"
        }
    },
    "formContainer": {
        "display": "flex",
        "flexDirection": "column",
        "width": "300px",
        "color": "white",
        "marginLeft": "15px",
        "marginRight": "15px"
    },
    "input": {
        "margin": theme.spacing(1),
    },
    "button": {
        "margin": theme.spacing(1),
        "padding": theme.spacing(1),
    },
    "wrappedButton": {
        "padding": theme.spacing(1),
    },
    "text": {
        "margin": theme.spacing(1),
        "color": theme.palette.grey["800"],
        [theme.breakpoints.down("xs")]: {
            "fontSize": "0.8rem"
        }
    },
    "errorMessage": {
        "color": "red",
        "textAlign": "center"
    },
    "successMessage": {
        "textAlign": "center",
        "color": tinycolor(theme.palette.success.main).setAlpha(0.9),
        "fontSize": "0.8rem"
    },
    "successPaper": {
        "margin": theme.spacing(1),
        "padding": theme.spacing(1),
        "backgroundColor": tinycolor(theme.palette.success.main).setAlpha(0.1)
    },
    "submitErrorMessage": {
        "textAlign": "center",
        "color": tinycolor(theme.palette.error.main).setAlpha(0.9),
        "fontSize": "0.8rem"
    },
    "errorPaper": {
        "margin": theme.spacing(1),
        "padding": theme.spacing(1),
        "backgroundColor": tinycolor(theme.palette.error.main).setAlpha(0.1),
    },
    "wrapper": {
        "margin": theme.spacing(1),
        "position": "relative",
    },
    "buttonProgress": {
        "position": "absolute",
        "top": "50%",
        "left": "50%",
        "marginTop": "-12px",
        "marginLeft": "-12px",
      },
    "homeButtonWrapper": {
        "flex": "0 0 100%"
    },
    "toolbarWrap" : {
        "flexWrap": "wrap" 
    }
}));

const AuthenticationScreen = () => {
    const { register, handleSubmit, setError, errors, getValues } = useForm({ mode: "onBlur"});

    const [ , setAuthState ] = useAuth();
    const [ submitSuccess, setSubmitSuccess ] = useState();
    const [ submitError, setSubmitError ] = useState();
    const [ isLoading, setLoading ] = useState(false);
    const [ redirectOnLogin, setRedirectOnLogin ] = useState(false);
    const [ connectionError, setConnectionError ] = useState(false);
    const [ isPasswordHidden, setPasswordHidden ] = useState(true);
    const match = useRouteMatch();

    const onSubmit = async credentials => { 
        try {
            setLoading(true);
            const { data } = await publicFetch.post(
              match.url === "/signup" ? "auth/signup" : "auth/signin",
              credentials
            );
      
            const stateData = {
                accessToken: data.accessToken,
                expiresAt: data.accessExpiresAt,
                userInfo: {
                    id: data.id,
                    username: data.username,
                    email: data.email
                }
            };
            setAuthState(stateData);
            setSubmitSuccess(data.message);
            setSubmitError("");
      
            setTimeout(() => {
              setRedirectOnLogin(true);
            }, 1000);
          } catch (error) {
            setLoading(false);
            if (error.response) {
                const { data } = error.response;
                console.error(data.message);
                if (data.errorList) {
                    data.errorList.forEach((error) => {
                        setError(error.field, "manual", error.message);
                    }); 
                }
                setSubmitError(data.message);
                setSubmitSuccess("");
            }
            else if (error.request) {
                console.error(JSON.stringify(error));
                setConnectionError(true);
            }
            else {
                console.error("Uhh ohh! Sth went a bit sideways...");
                console.error(error);
            }
          }
    };

    const classes = useStyles();

    const isRegisterPage = match.url === "/signup";

    const inputValidation = fieldName => ({
        required: `${fieldName} is required`,
        minLength: { 
            value: 3, 
            message: `${fieldName} must be longer than 2 letters`
        },
        maxLength: { 
            value: 15, 
            message: `${fieldName} must be shorter than 16 letters`
        },
        pattern: { 
            value: /^[a-zA-Z0-9_]*$/, 
            message: "Only lower and uppercase letters, numbers and _" 
        }
    });


    return (
        <>
        {redirectOnLogin && <Redirect to="/dashboard" />}
        <ErrorSnack error={connectionError} setError={setConnectionError}>
            Oi mate! Check your internet plug and try again.
        </ErrorSnack>
        <div className={classes.center}>
            <Paper className={classes.mainContainer}>
                <div className={classes.homeButtonWrapper}>
                    <Button
                        color="secondary"
                        startIcon={<NavigateBefore/>}
                        component={Link}
                        to="/"
                    >
                        Home Page
                    </Button>
                </div>
                <FontAwesomeIcon className={classes.logo} icon={faBookOpen}/>
                <form className={classes.formContainer} onSubmit={handleSubmit(onSubmit)}>
                    { isRegisterPage &&
                    <TextField
                        inputProps={{
                            name: "username",
                            ref: register(inputValidation("Username")),
                            "aria-autocomplete": "username"
                        }}
                        color="primary"
                        className={classes.input}
                        label="Username"
                        variant="outlined"
                        id="username-input"
                        error={errors.username !== undefined}
                        helperText={errors?.username?.message}
                    />
                    }
                    <TextField
                        inputProps={{
                            name: "email",
                            type: "email",
                            ref: register({
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            }),
                            "aria-autocomplete": "email"
                        }}
                        className={classes.input}
                        label="Email"
                        variant="outlined"
                        id="email-input"
                        error={errors.email !== undefined}
                        helperText={errors?.email?.message}
                    />
                    <TextField 
                        inputProps={{   
                            name: "password",
                            type: isPasswordHidden ? "password" : "text",
                            ref: register(inputValidation("Password")),
                            "aria-autocomplete": isRegisterPage ? "" : "password",
                        }}
                        InputProps={{ endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setPasswordHidden(!isPasswordHidden)}
                                onMouseDown={e => e.preventDefault()}
                              >
                                {isPasswordHidden ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                            )
                        }}
                        color="primary"
                        className={classes.input} 
                        label="Password"
                        variant="outlined"
                        id={isRegisterPage ? "new-password-input" : "new-password-input"}
                        error={errors.password !== undefined}
                        helperText={errors?.password?.message}
                    />
                    { isRegisterPage &&
                        <>
                        <TextField
                            inputProps={{
                                name: "passwordRepeat",
                                type: isPasswordHidden ? "password" : "text",
                                ref: register({
                                    validate: value => (value === getValues("password") || "Passwords don't match")
                                })
                            }}
                            InputProps={{ endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setPasswordHidden(!isPasswordHidden)}
                                    onMouseDown={e => e.preventDefault()}
                                  >
                                    {isPasswordHidden ? <VisibilityOff /> : <Visibility />}
                                  </IconButton>
                                </InputAdornment>
                                )
                            }}
                            color="primary"
                            className={classes.input}
                            label="Repeat password"
                            variant="outlined"
                            id="repeat-password-input"
                            error={errors.passwordRepeat !== undefined}
                            helperText={errors?.passwordRepeat?.message}
                        />
                        </>
                    }
                    { submitError &&
                        <Paper className={classes.errorPaper} elevation={0}>
                            <Typography className={classes.submitErrorMessage}>{submitError}</Typography>
                        </Paper>
                    }
                    {   submitSuccess &&
                        <Paper className={classes.successPaper} elevation={0}>
                            <Typography className={classes.successMessage}>{submitSuccess}</Typography>
                        </Paper>
                    }   
                    <div className={classes.wrapper}>
                        <Button 
                            style={{width: "100%"}}
                            className={classes.wrappedButton} 
                            type="submit" 
                            variant="contained" 
                            color="secondary"
                            disabled={isLoading}
                        >
                            {isRegisterPage ? "Sign Up" : "Sign In"}
                        </Button>
                        {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </div>
                    <Toolbar classes={{ root: classes.toolbarWrap}}>
                        <Typography className={classes.text}>
                            {isRegisterPage ? "Already registered?" : "Not registered yet?"}
                        </Typography>
                        <MuiLink
                            //className={classes.text}
                            component={Link}
                            to={isRegisterPage ? "/signin" : "/signup"}
                            onClick={()=>setSubmitError("")}
                        >
                            {isRegisterPage ? "Sign In" : "Sign Up"}
                        </MuiLink>
                    </Toolbar>
                    {/* <Button 
                        className={classes.button} 
                        classes={{root: classes.icon}} 
                        variant="contained" 
                        color="secondary"
                        component={Link}
                        to={isRegisterPage ? "/signin" : "/signup"}
                        onClick={()=>setSubmitError("")}
                    >
                        {isRegisterPage ? "Sign In" : "Sign Up"}
                    </Button> */}
                    {/* <Button 
                        className={classes.button} 
                        classes={{root: classes.icon}} 
                        variant="contained" 
                        color="secondary"
                        component={Link}
                        to="/"
                    >
                        Home Page
                    </Button> */}
                </form>
            </Paper>
            <Background/>
        </div>
        </>
    );
}

export default AuthenticationScreen;