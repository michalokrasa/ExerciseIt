import React from 'react';
import { Route } from 'react-router-dom';

import Navbar from './Navbar';
import ExerciseList from './ExerciseList';
import EditExercise from './EditExercise';
import CreateExercise from './CreateExercise';
import CreateUser from './CreateUser';

const Dashboard = props => {
    return (
        <div className='container'>
            <Navbar {...props} />
            <br />
            <Route exact path={`/${props.match.params.userName}`} component={ExerciseList} />
            <Route path={`/${props.match.params.userName}/edit/:id`} component={EditExercise} />
            <Route path={`/${props.match.params.userName}/create`} component={CreateExercise} />
            <Route path={`/${props.match.params.userName}/user`} component={CreateUser} />
        </div>
    );
}

export default Dashboard;