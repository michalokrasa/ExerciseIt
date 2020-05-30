import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';

import './Background.css';

const Background = props => (
    <div id='background'>
        <FontAwesomeIcon id='left-book' icon={faBookOpen} />
        <FontAwesomeIcon id='right-book' icon={faBookOpen} />
    </div>
);

export default Background;