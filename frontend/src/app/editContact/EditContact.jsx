import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateContact, fetchContactById } from '../store/contactSlice';
import { useRouter } from 'next/navigation';
import EditContactForm from './components/EditContactForm';
import ConfirmButton from './components/ConfirmButton';
import './page.css';
import { useSession } from 'next-auth/react';
import { DASHBOARD_ROUTE, LOGIN_ROUTE } from '../routes';
import Ledger from './components/Ledger';
import ContactInfo from './components/ContactInfo';

const EditContact = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [incompleteFields, setIncompleteFields] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [contact, setContact] = useState({
    Name: '',
    Title: '',
    ProfilePic: '',
    Cellphone: '',
    Email: '',
    Address: ''
  });
  const [temporaryContact, setTemporaryContact] = useState({ ...contact });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('id');
    if (id) {
      dispatch(fetchContactById(id));
    }
  }, [dispatch]);

  const selectedContact = useSelector((state) => state.contactSlice.selectedContact);

  useEffect(() => {
    if (selectedContact) {
      setContact(selectedContact);
      setTemporaryContact({ ...selectedContact });
    }
  }, [selectedContact]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTemporaryContact({
      ...temporaryContact,
      [name]: value
    });
    setValidationErrors({
      ...validationErrors,
      [name]: ''
    });
  };


  const handleFileChange = (profilePictureUrl) => {
    setTemporaryContact({
      ...temporaryContact,
      ProfilePic: profilePictureUrl
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
    const requiredFields = ['Name', 'Title', 'Address', 'Cellphone', 'Email'];
    const missingFields = requiredFields.filter(field => !temporaryContact[field]);

    if (missingFields.length > 0) {
      setIncompleteFields(missingFields);
      return;
    }

    const phoneValid = validatePhone(temporaryContact.Cellphone);
    const emailValid = validateEmail(temporaryContact.Email);

    if (!phoneValid || !emailValid) {
      const errors = {};
      if (!phoneValid) {
        errors.Cellphone = 'Only numbers are allowed';
      }
      if (!emailValid) {
        errors.Email = 'Please enter a valid email address';
      }
      setValidationErrors(errors);
      return;
    }

    try {
      console.log(temporaryContact)
      await dispatch(updateContact(temporaryContact));
      setContact(temporaryContact);
      setEditMode(false);
      router.push(DASHBOARD_ROUTE);
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  return (
    <div className="container">
      <Ledger editMode={editMode} setEditMode={setEditMode} onFileChange={handleFileChange} />
      <ContactInfo contact={contact} />
      <EditContactForm 
        onInputChange={handleInputChange}
        validationErrors={validationErrors}
        initialValues={temporaryContact}
        editMode={editMode}
      />
      {editMode && (
        <div className="button-container-edit">
          <ConfirmButton className="btn-add-edit" onClick={handleSaveContact}>
            Save Changes
          </ConfirmButton>
        </div>
      )}
      {incompleteFields.length > 0 && (
        <span className="missing-fields-message">
          Please complete the following fields: {incompleteFields.join(', ')}
        </span>
      )}
    </div>
  );
};

export default EditContact;