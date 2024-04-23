import '../styles/contactInfo.css';


const ContactInfo = () =>{
    return(
        <div className="contact-info">
<           div className="contact-image-container">
                <img src="/path-to-your-image.jpg" alt="Contact" className="contact-image" />
            </div>
            <div className="contact-details">
                <h2 className="contact-name">John Doe</h2>
                <p className="contact-position">Position</p>
            </div>
        </div>
    )
}

export default ContactInfo;
