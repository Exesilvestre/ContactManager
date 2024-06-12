import React, { useRef, useState } from 'react';
import config from '../../../config/config'

const FileInput = ({ id, label, onChange, setIsLoading }) => {
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

                onChange(profilePictureUrl);
            } catch (error) {
                console.error("Error uploading image to Cloudinary:", error);
            }finally {
                setIsLoading(false);
            }
        } else {
            setSelectedFileName('');
            const profilePictureUrl = e.target.value
            onChange(profilePictureUrl)
        }
    };

    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">{label}</label>
            <div className="input-group">
                <input
                    type="url"
                    className="form-control"
                    placeholder="Enter URL or Upload"
                    onChange={handleFileChange}
                />
                <input
                    type="file"
                    className="form-control"
                    ref={fileInputRef}
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
                <i className="bi bi-upload" onClick={() => fileInputRef.current.click()}></i>
            </div>
            {selectedFileName && (
                <div>{selectedFileName}</div>
            )}
        </div>
    );
};

export default FileInput;
