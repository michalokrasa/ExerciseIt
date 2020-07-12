import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { useAuthContext } from '../../contexts/AuthContext';

import Background from '../Background';

import styles from './Home.module.css';
import logo from '../../assets/img/knowledge.svg';


const Home = props => {
    const { authState } = useAuthContext();

    return (
        authState.isAuthenticated ?
            <Redirect
                to={{
                    pathname: `/${authState.user}`,
                }}
            /> : 
        <div>
            <nav className='navbar navbar-dark bg-dark navbar-expand justify-content-between'>
                <span className='navbar-brand'>
                    <img src={logo} className={styles.brandLogo} alt='ExerciseIt logo' width='28px' height='28px' />
                    <span className={styles.brandText}>ExerciseIt</span>
                </span>
                <span className={styles.navButtonsContainer}>
                    <Link to='/login' className={`btn btn-outline-success ${styles.navButton}`}>Sign In</Link>
                    <Link to='/register' className={`btn btn-outline-success ml-2 ${styles.navButton}`}>Register</Link>
                </span>
            </nav>
            <div className={styles.center}>
                <main className={styles.mainContainer}>
                    <h1 className={styles.title} >
                        Manage all your <br/>
                        <span className={styles.emphasis}>
                            knowledge
                        </span><br/> 
                        from one place
                    </h1>
                    <div className={styles.titleIcon}>
                        <FontAwesomeIcon icon={faBookOpen}/>
                    </div>
                    <div className={styles.mainButtonsContainer}>
                        <Link to='/login' className={`btn btn-success ${styles.mainButton}`}>Sign In</Link>
                        <Link to='/register' className={`btn btn-success ${styles.mainButton}`}>Register</Link>
                    </div>
                </main>
            </div>
            <Background/>
        </div>
    );
}


export default Home;