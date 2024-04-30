import '../styles/ConfirmAdd.css';
import React, { useState, useEffect } from 'react';

const ConfirmAdd = ({ onSave, newContact }) => {
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const allFieldsCompleted = Object.values(newContact).every(field => !!field);
        setIsFormValid(allFieldsCompleted);
    }, [newContact]);

    const handleSave = () => {
        if (isFormValid) {
            onSave();
        } else {
            alert('All fields need to be filled.');
        }
    };

    return (
        <div className="button-container">
            <button className="btn-add" onClick={handleSave} disabled={!isFormValid}>
                Confirm Contact
            </button>
        </div>
    );
};

export default ConfirmAdd;