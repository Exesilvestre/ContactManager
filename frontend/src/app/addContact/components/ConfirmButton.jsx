import React from 'react';

const ConfirmButton = ({ className, onClick, children }) => {
    return (
        <button className={className} onClick={onClick}>
            {children}
        </button>
    );
};

export default ConfirmButton;
