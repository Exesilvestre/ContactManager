'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from './store/contactSlice';
import ContactList from './components/ContactList';
import { useSession } from "next-auth/react";
import './page.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { items: contacts, status: contactsStatus } = useSelector((state) => state.contactSlice);
  const { data: session, status } = useSession();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  if (status === "loading" || contactsStatus === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <h1 className="dashboard-title">Contacts</h1>
      
      <div className="row mt-4">
        <div className="col">
          <div className="input-group search-container">
            <span className="input-group-text search-icon"><i className="bi bi-search"></i></span>
            <input type="text" className="form-control search-input" placeholder="Search..." />
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col">
          <ContactList contacts={contacts} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;