'use client';
import React, { useState } from 'react';
import { addContact } from '../store/contactSlice'; 
import { useDispatch } from 'react-redux';
import ContactForm from './components/ContactForm';
import './page.css';
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const AddContact = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { data: session } = useSession();

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
    };

    const handleFileChange = (profilePictureUrl) => {
        setNewContact({
            ...newContact,
            profilePicture: profilePictureUrl
        });
    };

    const handleSaveContact = async () => {
        if (!session) {
            router.push("/login");
            return;
        }
        const allFieldsCompleted = Object.values(newContact).every(field => !!field);
        console.log("All fields completed:", allFieldsCompleted);
        console.log(newContact)
        if (!allFieldsCompleted) {
            alert('All fields need to be filled.');
            return;
        }
        try {
            dispatch(addContact(newContact));
            router.push('/dashboard');
        } catch (error) {
            console.error("Error adding contact:", error);
        }
    };



    return (
        <div className="container">
            <ContactForm 
                onInputChange={handleInputChange}
                onFileChange={handleFileChange}
            />
            <div className="button-container">
                <button className="btn-add" onClick={handleSaveContact}>
                    Confirm Contact
                </button>
            </div>
        </div>
    );
};

export default AddContact;
