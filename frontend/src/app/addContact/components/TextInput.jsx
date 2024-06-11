import React from 'react';

const TextInput = ({ id, label, name, placeholder, type = "text", onChange, validationError }) => {
    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">{label}:</label>
            <input 
                type={type}
                placeholder={placeholder}
                className="form-control"
                id={id}
                name={name}
                onChange={onChange}
                required
            />
            {validationError && (
                <span className="error-message">{validationError}</span>
            )}
        </div>
    );
};

export default TextInput;
