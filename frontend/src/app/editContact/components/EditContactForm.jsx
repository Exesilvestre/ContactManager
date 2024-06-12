// EditContactForm.jsx
import React, {useState, useEffect, useCallback} from 'react';
import TextInput from '../../utils/TextInput';
import useGooglePlacesAutocomplete from '../../addContact/hooks/useGooglePlacesAutocomplete';

const EditContactForm = ({ onInputChange, validationErrors, initialValues, editMode }) => {
    const [addressValue, setAddressValue] = useState(initialValues.Address);
    const onAddressChange = useCallback((address) => {
        onInputChange({
            target: {
                name: "Address",
                value: address,
            }
        });
        setAddressValue(address);
    }, [onInputChange]);

    const addressInputRef = useGooglePlacesAutocomplete(onAddressChange);
    useEffect(() => {
        setAddressValue(initialValues.Address);
    }, [initialValues.Address]);

    return (
        <form className="contact-form">
            <div className="row">
                <div className="col-md-6">
                    <TextInput 
                        id="Name"
                        label="Name"
                        name="Name"
                        placeholder="Enter contact's name"
                        onChange={onInputChange}
                        validationError={validationErrors.Name}
                        value={initialValues.Name}
                        disabled={!editMode}
                    />
                    <TextInput 
                        id="Title"
                        label="Title"
                        name="Title"
                        placeholder="Enter contact's title"
                        onChange={onInputChange}
                        validationError={validationErrors.Title}
                        value={initialValues.Title}
                        disabled={!editMode}
                    />
                    <div className="mb-3">
                        <label htmlFor="Address" className="form-label">Address:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="Address"
                            name="Address"
                            ref={addressInputRef}
                            required
                            placeholder="Enter contact's address"
                            defaultValue={addressValue}
                            disabled={!editMode}
                        />
                        {validationErrors.Address && (
                            <span className="error-message">{validationErrors.Address}</span>
                        )}
                    </div>
                </div>
                <div className="col-md-6">
                    <TextInput 
                        id="Cellphone"
                        label="Phone"
                        name="Cellphone"
                        placeholder="Enter contact's phone"
                        type="tel"
                        onChange={onInputChange}
                        validationError={validationErrors.Cellphone}
                        value={initialValues.Cellphone}
                        disabled={!editMode}
                    />
                    <TextInput 
                        id="Email"
                        label="Email"
                        name="Email"
                        placeholder="Enter contact's email"
                        type="email"
                        onChange={onInputChange}
                        validationError={validationErrors.Email}
                        value={initialValues.Email}
                        disabled={!editMode}
                    />
                </div>
            </div>
        </form>
    );
};

export default EditContactForm;
