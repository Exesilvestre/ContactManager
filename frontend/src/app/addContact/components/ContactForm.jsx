import React from 'react';
import TextInput from '../../utils/TextInput';
import FileInput from './FileInput';
import useGooglePlacesAutocomplete from '../hooks/useGooglePlacesAutocomplete';

const ContactForm = ({ onInputChange, onFileChange, validationErrors, setIsLoading }) => {


    const onAddressChange = (address) => {
        onInputChange({
            target: {
                name: "address",
                value: address,
            }
        });
    };

    const addressInputRef = useGooglePlacesAutocomplete(onAddressChange);

    return (
        <form className="contact-form">
            <div className="row">
                <div className="col-md-6">
                    <TextInput 
                        id="name"
                        label="Name"
                        name="name"
                        placeholder="Enter contacts name"
                        onChange={onInputChange}
                        validationError={validationErrors.name}
                    />
                    <TextInput 
                        id="title"
                        label="Title"
                        name="title"
                        placeholder="Enter contacts title"
                        onChange={onInputChange}
                        validationError={validationErrors.title}
                    />
                    <FileInput 
                        id="profilePicture"
                        label="Profile Picture"
                        onChange={onFileChange}
                        setIsLoading={setIsLoading}
                    />
                </div>
                <div className="col-md-6">
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            ref={addressInputRef}
                            required
                            placeholder='Enter contacts address'
                        />
                        {validationErrors.address && (
                            <span className="error-message">{validationErrors.address}</span>
                        )}
                    </div>
                    <TextInput 
                        id="phone"
                        label="Phone"
                        name="phone"
                        placeholder="Enter contacts phone"
                        type="tel"
                        onChange={onInputChange}
                        validationError={validationErrors.phone}
                    />
                    <TextInput 
                        id="email"
                        label="Email"
                        name="email"
                        placeholder="Enter contacts email"
                        type="email"
                        onChange={onInputChange}
                        validationError={validationErrors.email}
                    />
                </div>
            </div>
        </form>
    );
};

export default ContactForm;