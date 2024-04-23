
import '../styles/AddContact.css'
import ContactForm from './ContactForm';
import ConfirmAdd from './ConfirmAdd';
import { addContact } from '../store/contactSlice'; 
import { useDispatch } from 'react-redux';
import  { useState } from 'react';


const AddContact = () => {
    const dispatch = useDispatch();
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

    const handleSaveContact = () => {
        dispatch(addContact(newContact));
        onCancel();
    };


    return (
        <div className="container">
            <div className="ledger">
                <div className="upload-icon-container">
                    <i className="bi bi-upload"></i>
                </div>
            </div>
            <div className="contact-info">
                <div className="contact-image-container">
                    <img src="/path-to-your-image.jpg" alt="Contact" className="contact-image" />
                </div>
                <div className="contact-details">
                    <h2 className="contact-name">John Doe</h2>
                    <p className="contact-position">Position</p>
                </div>
            </div>
            <ContactForm onInputChange={handleInputChange}/>

            <ConfirmAdd onSave={handleSaveContact} />

        </div>
    );
};

export default AddContact;