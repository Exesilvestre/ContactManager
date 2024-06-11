import React from 'react';

const TextInput = ({ id, label, name, placeholder, onChange, validationError, value, disabled }) => (
    <div className="mb-3">
        <label htmlFor={id} className="form-label">{label}:</label>
        <input 
            type="text" 
            className="form-control" 
            id={id} 
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            disabled={disabled}
        />
        {validationError && (
            <span className="error-message">{validationError}</span>
        )}
    </div>
);

export default TextInput;
