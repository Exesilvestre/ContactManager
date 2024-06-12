'use client';
import React, { useState, useEffect } from 'react';
import { addContact } from '../store/contactSlice'; 
import { useDispatch } from 'react-redux';
import ContactForm from './components/ContactForm';
import './page.css';
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { DASHBOARD_ROUTE, LOGIN_ROUTE } from '../routes';
import Button from '../utils/Button';
import './styles/ConfirmAdd.css'

const AddContact = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { data: session } = useSession();
    const [incompleteFields, setIncompleteFields] = useState([]);
    const [validationErrors, setValidationErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const [newContact, setNewContact] = useState({
        name: '',
        title: '',
        profilePicture: '',
        address: '',
        phone: '',
        email: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewContact({
            ...newContact,
            [name]: value
        });
        setValidationErrors({
            ...validationErrors,
            [name]: ''
        });
    };

    const handleFileChange = (profilePictureUrl) => {
        setNewContact({
            ...newContact,
            profilePicture: profilePictureUrl
        });
    };

    const validatePhone = (phone) => {
        const phonePattern = /^\d+$/;
        return phonePattern.test(phone);
    };

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const handleSaveContact = async () => {
        if (!session) {
            router.push(LOGIN_ROUTE);
            return;
        }
        const requiredFields = ['name', 'title', 'address', 'phone', 'email'];
        const missingFields = requiredFields.filter(field => !newContact[field]);

        if (missingFields.length > 0) {
            setIncompleteFields(missingFields);
            return;
        }

        const phoneValid = validatePhone(newContact.phone);
        const emailValid = validateEmail(newContact.email);

        if (!phoneValid || !emailValid) {
            const errors = {};
            if (!phoneValid) {
                errors.phone = 'Only numbers are allowed';
            }
            if (!emailValid) {
                errors.email = 'Please enter a valid email address';
            }
            setValidationErrors(errors);
            return;
        }

        try {
            dispatch(addContact(newContact));
            router.push(DASHBOARD_ROUTE);
        } catch (error) {
            console.error("Error adding contact:", error);
        }
    };

    return (
        <div className="container">
            <ContactForm 
                onInputChange={handleInputChange}
                onFileChange={handleFileChange}
                validationErrors={validationErrors}
                setIsLoading={setIsLoading}
            />
            <div className="button-container-confirm">
                <Button 
                    className="btn-add-confirm" 
                    onClick={handleSaveContact} 
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Confirm Contact'}
                </Button>
            </div>
            {incompleteFields.length > 0 && (
                <span className="missing-fields-message">
                    Please complete the following fields: {incompleteFields.join(', ')}
                </span>
            )}
        </div>
    );
};

export default AddContact;
