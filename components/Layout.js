import React, { Fragment } from 'react';
import Header from './Header';
import styles from './Layout.module.css';
import { Container } from 'semantic-ui-react';


export default (props) => {
    return (
        <div className={styles.body}>
            <Header />
            <div className={styles.container}>
                {props.children}
            </div>
            {/* <h1>I am a footer</h1> */}
        </div>
    )
}