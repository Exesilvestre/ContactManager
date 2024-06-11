import React from 'react';
import styles from '../login.module.css';

const LoginButton = ({ type, className, disabled, children }) => {
    return (
        <button type={type} className={`${styles.button} ${className}`} disabled={disabled}>
            {children}
        </button>
    );
};

export default LoginButton;
