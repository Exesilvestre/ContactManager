import React from 'react';
import '../styles/ConfirmAdd.css'

const ConfirmButton = ({ className, onClick, children }) => {
    return (
        <button className={className} onClick={onClick}>
            {children}
        </button>
    );
};

export default ConfirmButton;
