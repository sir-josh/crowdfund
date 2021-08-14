import React, { Fragment } from 'react';
import styles from './Layout.module.css';
// import './styles.css';

export default (props) => {
    return (
        <div className={styles.body}>
            <h1 className={styles.layoutHeader}>CROWDFUND</h1>
            <div className={styles.layoutBody}>
                {props.children}
            </div>
            {/* <h1>I am a footer</h1> */}
        </div>
    )
}
