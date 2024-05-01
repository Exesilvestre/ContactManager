'use client';
import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './page.css';
import { useSearchParams } from 'next/navigation';
import Ledger  from './components/Ledger';
import ContactInfo from './components/ContactInfo'
import { fetchContactById } from '../store/contactSlice';

const EditContact = () =>{
    const dispatch = useDispatch();
    const { selectedContact, status } = useSelector((state) => state.contactSlice);
    const searchParams = useSearchParams();
    const contactId = searchParams.get("id");

    useEffect(() => {
        if (contactId) {
          dispatch(fetchContactById(contactId));
        }
      }, [dispatch, contactId]);

    return (
        <div className='container'>
            {/*<div className="contact-info-container">
                <ContactInfo contact={selectedContact} />
            </div>
    <Ledger />*/}
            <h1>Not implemented yet</h1>
            

        </div>

    );
}


export default EditContact;