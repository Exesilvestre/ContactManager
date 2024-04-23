import '../styles/NoContacts.css';

const NoContacts = () => (
  <div className="no-contacts">
    <span className="no-contacts-logo">
        <img src="/NoContacts1.png" alt="No contacts" className="no-contacts-img" /> {/* Cambia la clase aquí */}
    </span>
    <p className="no-contacts-text">Add contacts to your database</p>
  </div>
);

export default NoContacts;