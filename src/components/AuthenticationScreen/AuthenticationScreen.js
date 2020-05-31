import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import Background from '../Background'; 
import styles from './AuthenticationScreen.module.css'

const LoginScreen = ({ match }) => {

    return (
        <div className={styles.center}>
            <main className={styles.mainContainer}>
                <FontAwesomeIcon className={styles.logo} icon={faBookOpen}/>
                <form className={styles.formContainer}>
                    <div className='form-group'>
                        <label htmlFor='username'>Username:</label>
                        <input 
                            type='text' 
                            placeholder='Enter username'
                            required
                            className='form-control'
                            />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password:</label>
                        <input
                            type='password'
                            placeholder='Enter password'
                            required
                            className='form-control'
                        />
                    </div>
                    {
                        match.url === '/register' && 
                        <div className='form-group'>
                            <label htmlFor='password'>Confirm Password:</label>
                            <input
                                type='password'
                                placeholder='Confirm password'
                                required
                                className='form-control'
                            />
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

export default LoginScreen;