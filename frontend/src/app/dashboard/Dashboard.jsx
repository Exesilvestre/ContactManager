'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../store/contactSlice';
import ContactList from './components/ContactList';
import { useSession } from "next-auth/react";
import './page.css';
import SearchBar from './components/SearchBar';
import { useRouter } from "next/navigation";
import {ADD_CONTACT_ROUTE, LOGIN_ROUTE} from '../routes'
import Button from '../utils/Button'
import './styles/AddButton.css'


const Dashboard = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { items: contacts, status: contactsStatus } = useSelector((state) => state.contactSlice);
  const { data: session, status } = useSession();


  const handleAddButtonClick = () => {
    if (!session) {
      router.push(ADD_CONTACT_ROUTE);
      return;
    }

    router.push(ADD_CONTACT_ROUTE);
  };

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    if (contactsStatus === 'success') {
      dispatch(fetchContacts());
      console.log(contacts)
    }
  }, [contactsStatus, dispatch]);


  if (status === "loading" || contactsStatus === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
        <h1 className="dashboard-title">Contacts</h1>
        <SearchBar />
        <div className="row mt-4">
          <div className="col">
            <ContactList contacts={contacts}/>
          </div>
        </div>
        <div className="button-container">
          <Button className="btn-add" onClick={handleAddButtonClick}>
            Add contact
          </Button>   
        </div>
    </div>
  );
};

export default Dashboard;
