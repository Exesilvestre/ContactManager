import React, { useRef, useState } from 'react';
import config from '../../../config/config';

const UploadIcon = ({ onFileChange, setIsLoading }) => {
    const fileInputRef = useRef(null);
    const [selectedFileName, setSelectedFileName] = useState('');

    const handleFileChange = async (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFileName(file.name);
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'ml_default');

            setIsLoading(true);
            try {
                const response = await fetch(config.cloudinaryUploadUrl, {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();
                const profilePictureUrl = data.secure_url;

                
                if (onFileChange) {
                    onFileChange(profilePictureUrl);
                }
            } catch (error) {
                console.error("Error uploading image to Cloudinary:", error);
            } finally {
                setIsLoading(false);
            }
        } else {
            setSelectedFileName('');
        }
    };

    return (
        <div className="upload-icon-container" onClick={() => fileInputRef.current.click()}>
            <i className="bi bi-upload"></i>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleFileChange}
            />
            {selectedFileName && <div>{selectedFileName}</div>}
        </div>
    );
};

export default UploadIcon;
