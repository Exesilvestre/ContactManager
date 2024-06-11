import React from 'react';
import styles from '../login.module.css';

const LoginInput = ({ id, label, type, value, onChange, onBlur, disabled, error }) => {
    return (
        <div className="form-group">
            <label htmlFor={id} className={styles.inputLabel}>{label}</label>
            <input
                type={type}
                id={id}
                name={id}
                className={`${styles.inputField} form-control`}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                disabled={disabled}
            />
            {error && (
                <div className={styles.error}>{error}</div>
            )}
        </div>
    );
};

export default LoginInput;
