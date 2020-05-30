import React from 'react';
import { Link } from 'react-router-dom';
 
const Navbar = props => {
    return (
        <nav className='navbar navbar-dark bg-dark navbar-expand'>
            <Link to={`/${props.match.params.userName}`} className='navbar-brand'>ExerciseIt</Link>
            <div className='collapse navbar-collapse'>
                <ul className='navbar-nav mr-auto'>
                    <li	className='navbar-item'>
                        <Link to={`/${props.match.params.userName}`} className='nav-link'>Exercises</Link>
                    </li>
                    <li className='navbar-item'>
                        <Link to={`/${props.match.params.userName}/create`} className='nav-link'>Create Exercise Log</Link>
                    </li>
                    <li className='navbar-item'>
                        <Link to={`/${props.match.params.userName}/user`} className='nav-link'>Create User</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;