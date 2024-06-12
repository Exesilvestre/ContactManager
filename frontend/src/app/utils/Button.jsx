import React from 'react';

const Button = ({ className, onClick, disabled = false, children }) => {
    return (
        <button className={className} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
};

export default Button;