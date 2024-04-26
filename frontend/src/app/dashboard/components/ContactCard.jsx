import '../styles/ContactCard.css';

const ContactCard = ({ contact }) => {
  console.log(contact);
  return (
    <div className="col">
      <div className="card mb-3 card-contact">
        <div className="row no-gutters info">
          <div className="col-md-4">
            <img src={contact.ProfilePic} className="card-img profile-pic" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body d-flex justify-content-between align-items-center">
              <h5 className="card-title">{contact.Name}</h5>
              <button className="btn-edit">{'>'}</button>
            </div>
            <p className="card-text">{contact.Title}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactCard;