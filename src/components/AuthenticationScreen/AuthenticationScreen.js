import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useForm, ErrorMessage } from 'react-hook-form';
import axios from 'axios';
import { useAuthContext } from '../../contexts/AuthContext';
import { Redirect } from 'react-router-dom';

import Background from '../Background'; 
import styles from './AuthenticationScreen.module.css'

const AuthenticationScreen = ({ match }) => {
    const [ authState, authDispatch ] = useAuthContext();
    const { register, handleSubmit, errors, getValues, reset } = useForm({ mode: 'onBlur'});
    const onSubmit = data => { 
        // change url to const from config/const.js
        axios.post(`http://localhost:8080/api/auth${match.url}`, data)
            .then(res => {
                const { user, id, accessToken, refreshToken } = res.data;

                authDispatch({
                    type: 'LOGIN',
                    payload: { user, id, accessToken, refreshToken }
                });
            })
            .catch(err => {
                reset({ password: '' });
            });

    };

    return (
        authState.isAuthenticated ?
        <Redirect
            to={{
                pathname: `/${authState.user}`,
            }}
        /> : 
        <div className={styles.center}>
            <main className={styles.mainContainer}>
                <FontAwesomeIcon className={styles.logo} icon={faBookOpen}/>
                <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
                    <div className='form-group'>
                        <label htmlFor='username'>Username:</label>
                        <input 
                            name='username'
                            ref={register({
                                required: 'Username is required',
                                minLength: { value: 3, message: 'Username must be longer than 2 letters'},
                                maxLength: { value: 15, message: 'Username must be shorter than 16 letters'},
                                pattern: { value: /^[a-zA-Z0-9_]*$/, message: 'Only lower and uppercase letters, numbers and _' }
                            })}
                            type='text' 
                            placeholder='Enter username'
                            required
                            className='form-control'
                            autoComplete='username'
                            />
                        <div className={styles.errorMessage} >
                            <ErrorMessage name='username' errors={errors}/>
                        </div>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password:</label>
                        <input
                            name='password'
                            ref={register({
                                required: 'Password is required',
                                minLength: { value: 3, message: 'Password must be longer than 2 letters' },
                                maxLength: { value: 15, message: 'Password must be shorter than 16 letters' },
                                pattern: { value: /^[a-zA-Z0-9_]*$/ , message: 'Only lower and uppercase letters, numbers and _' }
                            })}
                            type='password'
                            placeholder='Enter password'
                            required
                            className='form-control'
                            autoComplete={match.url === '/register' ? 'new-password' : 'current-password'}
                        />
                        <div className={styles.errorMessage} >
                            <ErrorMessage name='password' errors={errors} />
                        </div>
                    </div>
                    {
                        match.url === '/register' && 
                        <div className='form-group'>
                            <label htmlFor='passwordConfirm'>Confirm Password:</label>
                            <input
                                name='passwordConfirm'
                                ref={register({
                                    validate: value => value === getValues('password') || "Passwords don't match"
                                })}
                                type='password'
                                placeholder='Confirm password'
                                required
                                className='form-control'
                                autoComplete='new-password'
                            />
                            <div className={styles.errorMessage} >
                                <ErrorMessage name='passwordConfirm' errors={errors} />
                            </div>
                        </div>
                    }
                    <SubmitSection {...match}/>
                    <Link to='/' className={`btn btn-outline-success ${styles.alternativeButton}`}>Main Page</Link>
                </form>
            </main>
            <Background/>
        </div> 
    );
}

const SubmitSection = ({url}) => {
    if (url === '/login') {
        return (
            <div>
                <div className='form-group'>
                    <input type='submit' value='Login' className={`btn btn-success ${styles.submitButton}`}/>
                </div>
                <span className={styles.tip}>Not registered yet?</span>
                <Link to='/register' className={`btn btn-outline-success ${styles.alternativeButton}`}>Register</Link>
            </div>
        );
    }
    else {
        return (
            <div>
                <div className='form-group'>
                    <input type='submit' value='Register' className={`btn btn-success ${styles.submitButton}`} />
                </div>
                <span className={styles.tip}>Already registered?</span>
                <Link to='/login' className={`btn btn-outline-success ${styles.alternativeButton}`}>Sign In</Link>
            </div>
        );
    }
    
}

export default AuthenticationScreen;