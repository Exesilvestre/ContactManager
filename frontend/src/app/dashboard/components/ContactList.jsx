import { useState } from 'react';

const ContactList = ({ contacts }) => {
  const [noContacts, setNoContacts] = useState(false);

  if (contacts.length === 0) {
    return (
      <div className="no-contacts">
        <span className="no-contacts">
            <img src="/NoContacts1.png" alt="No contacts" className="no-contacts" />
        </span>
        <p className="no-contacts-text">No contacts available</p>
      </div>
    );
  }

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {contacts.map((contact, index) => (
        <div key={index} className="col">
          <div className="card mb-3" style={{ maxWidth: '540px' }}>
            <div className="row no-gutters">
              <div className="col-md-4">
                <img src="..." className="card-img" alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{contact.name}</h5>
                  <p className="card-text">{contact.description}</p>
                  {/* Más detalles del contacto si es necesario */}
                  <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
