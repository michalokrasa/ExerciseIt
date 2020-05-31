import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';

import styles from './Background.module.css';

const Background = props => (
    <div className={styles.background}>
        <FontAwesomeIcon className={styles.leftBook} icon={faBookOpen} />
        <FontAwesomeIcon className={styles.rightBook} icon={faBookOpen} />
    </div>
);

export default Background;