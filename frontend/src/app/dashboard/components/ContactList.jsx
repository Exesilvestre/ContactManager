import  { useState } from 'react';
import NoContacts from './NoContacts';
import ContactCard from './ContactCard';

const ContactList = ({ contacts }) => {

  if (contacts.length === 0) {
    return <NoContacts />;
  }

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {contacts.map((contact, index) => (
        <ContactCard key={index} contact={contact} />
      ))}
    </div>
  );
};

export default ContactList;