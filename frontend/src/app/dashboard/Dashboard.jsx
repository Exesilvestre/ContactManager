'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from './store/contactSlice';
import ContactList from './components/ContactList';
import { useSession } from "next-auth/react";
import './page.css';
import SearchBar from './components/SearchBar';
import AddButton from './components/AddButton';
import AddContact from './components/AddContact';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { items: contacts, status: contactsStatus } = useSelector((state) => state.contactSlice);
  const { data: session, status } = useSession();

  const [showAddContact, setShowAddContact] = useState(false);

  const handleAddButtonClick = () => {
    setShowAddContact(true);
  };

  const handleCancelAddContact = () => {
    setShowAddContact(false);
  }

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  if (status === "loading" || contactsStatus === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      {showAddContact ? (
        <>
          <h1 className="dashboard-title">Contacts</h1>
          <SearchBar />
          <div className="row mt-4">
            <div className="col">
              <ContactList contacts={contacts} />
            </div>
          </div>
          <AddButton onAddClick={handleAddButtonClick} />
        </>
      ) : 
      <AddContact onCancel={handleCancelAddContact} />}
    </div>
  );
};

export default Dashboard;
