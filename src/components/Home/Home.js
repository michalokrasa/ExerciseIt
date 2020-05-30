import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';

import Background from '../Background';

import './Home.css';
import logo from '../../assets/img/knowledge.svg';


const Home = props => (
    <div>
        <nav className='navbar navbar-dark bg-dark navbar-expand justify-content-between'>
            <span className='navbar-brand'>
                <img src={logo} alt='ExerciseIt logo' width='28px' height='28px' />
                <span id='brand-text'>ExerciseIt</span>
            </span>
            <span>
                <Link to='/login' className='btn btn-outline-success'>Sign In</Link>
                <Link to='/register' className='btn btn-outline-success ml-2'>Register</Link>
            </span>
        </nav>
        <main>
            <div className='container'>
                <h1 id='title' >Manage all your <br/> <span>knowledge</span> <br/> from one place</h1>
                <div id='title-icon'>
                    <FontAwesomeIcon icon={faBookOpen} size='6x'/>
                </div>
                <div id='main-buttons'>
                    <Link to='/login' className='btn btn-success btn-lg'>Sign In</Link>
                    <Link to='/register' className='btn btn-success btn-lg ml-4'>Register</Link>
                </div>
            </div>
        </main>
        <Background/>
    </div>
);


export default Home;