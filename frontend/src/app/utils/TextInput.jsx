import React from 'react';

const TextInput = ({ 
    id, 
    label, 
    name, 
    placeholder, 
    type = "text", 
    onChange, 
    validationError, 
    value, 
    disabled, 
    required = true 
}) => {
    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">{label}:</label>
            <input 
                type={type}
                className="form-control"
                id={id}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                disabled={disabled}
                required={required}
            />
            {validationError && (
                <span className="error-message">{validationError}</span>
            )}
        </div>
    );
};

export default TextInput;