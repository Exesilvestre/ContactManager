import React, { useState } from 'react';
import '../styles/ledger.css';
import EditButton from './EditButton'


const Ledger = () => {
    const [editMode, setEditMode] = useState(false);

    const handleEditClick = () => {
        setEditMode(!editMode);
    };

    return (
        <div className="ledger">
            {editMode ? (
                <div className="upload-icon-container">
                    <i className="bi bi-upload"></i>
                </div>
            ) : (
                <EditButton onEditClick={handleEditClick} />
            )}
        </div>
    );
};

export default Ledger;
