import React from 'react';
import '../styles/ledger.css';
import '../styles/EditButton.css'
import UploadIcon from './UploadIcon';
import Button from '@/app/utils/Button';

const Ledger = ({ editMode, setEditMode, onFileChange, setIsLoading }) => {
    const handleEditClick = () => {
        setEditMode(!editMode);
    };

    return (
        <div className="ledger">
            {editMode ? (
                <UploadIcon onFileChange={onFileChange} setIsLoading={setIsLoading} />
            ) : (
                <div className="button-container-ledger">
                    <Button className="btn-edit-ledger" onClick={handleEditClick}>
                        EDIT
                    </Button>
                </div>

            )}
        </div>
    );
};

export default Ledger;
