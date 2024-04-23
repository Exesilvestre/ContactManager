import  { useState } from 'react';
import NoContacts from './NoContacts';
import ContactItem from './Contact';

const ContactList = ({ contacts }) => {

  if (contacts.length === 0) {
    return <NoContacts />;
  }

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {contacts.map((contact, index) => (
        <ContactItem key={index} contact={contact} />
      ))}
    </div>
  );
};

export default ContactList;