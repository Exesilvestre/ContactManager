import '../styles/ContactCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGreaterThan } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "next/navigation";


const ContactCard = ({ contact }) => {
  const router = useRouter();
  const handleEdit = () => {
    router.push(`/editContact?id=${contact.IdContact}`);
 };


  return (
    <div className="col card-cont">
      <div className="card mb-3 card-contact">
        <div className="row no-gutters info">
          <div className="col-md-4">
            <img src={contact.ProfilePic} className="card-img profile-pic" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title name">{contact.Name}</h5>
              <button className="btn-edit"onClick={handleEdit} >
                <FontAwesomeIcon icon={faGreaterThan}  />
              </button>
            </div>
            <p className="card-text">{contact.Title}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactCard;