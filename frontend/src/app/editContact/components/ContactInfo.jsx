import '../styles/contactInfo.css';


const ContactInfo = ({ contact }) =>{
    if (!contact) {
        return null; // Si contact es undefined, no renderizar nada
    }
    return(
        <div className="contact-info">
<           div className="contact-image-container">
                <img src={contact.ProfilePic} alt="Contact" className="contact-image" />
            </div>
            <div className="contact-details">
                <h2 className="contact-name">{contact.Name}</h2>
                <p className="contact-position">{contact.Title}</p>
            </div>
        </div>
    )
}

export default ContactInfo;
