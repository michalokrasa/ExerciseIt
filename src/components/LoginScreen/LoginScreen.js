import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';

import Background from '../Background'; 
import './LoginScreen.css'

const LoginScreen = props => (
    <div>
        <main>
            <FontAwesomeIcon id='logo' icon={faBookOpen}/>
            <form>
                <div className='form-group'>
                    <label htmlFor='username'>Username:</label>
                    <input 
                        type='text' 
                        id='username' 
                        placeholder='Enter username'
                        required
                        className='form-control'
                        />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password:</label>
                    <input
                        type='password'
                        id='password'
                        placeholder='Enter password'
                        required
                        className='form-control'
                    />
                </div>
            </form>
        </main>
        <Background/>
    </div>
);


export default LoginScreen;