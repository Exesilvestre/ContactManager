'use client';
import ContactForm from './components/ContactForm';
import ConfirmAdd from './components/ConfirmAdd';
import { addContact } from '../store/contactSlice'; 
import { useDispatch } from 'react-redux';
import { useState } from 'react';
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
        try {
            // Guardar contacto en backend con URL de Cloudinary
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
            <ConfirmAdd onSave={handleSaveContact} newContact={newContact} />
        </div>
    );
};

export default AddContact;
