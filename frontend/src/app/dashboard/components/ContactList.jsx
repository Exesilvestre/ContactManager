// Componente ContactList
import NoContacts from './NoContacts';
import ContactCard from './ContactCard';
import '../styles/contactList.css';

const ContactList = ({ contacts }) => {
  if (contacts.length === 0) {
    return <NoContacts />;
  }

  return (
    <div className="container-grid">
      <div className="row row-cols-1 row-cols-md-3 g-4 ">
        {contacts.map((contact, index) => (
          <div key={index} className="col grid-card">
            <div className="card-container"> 
              <ContactCard key={index} contact={contact}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
