import React from 'react';
import '../styles/ledger.css';
import EditButton from './EditButton';
import UploadIcon from './UploadIcon';

const Ledger = ({ editMode, setEditMode, onFileChange }) => {
    const handleEditClick = () => {
        setEditMode(!editMode);
    };

    return (
        <div className="ledger">
            {editMode ? (
                <UploadIcon onFileChange={onFileChange} />
            ) : (
                <EditButton onEditClick={handleEditClick} />
            )}
        </div>
    );
};

export default Ledger;
