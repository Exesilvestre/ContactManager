"use client";
import '../styles/ContactCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from "next/navigation";
import { faGreaterThan, faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteContact } from '@/app/store/contactSlice';
import { useDispatch } from 'react-redux';


const ContactCard = ({ contact}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleEdit = () => {
    router.push(`/editContact?id=${contact.IdContact}`); 
  };

  const handleDelete =() =>{
    try {
      console.log("llego")
      dispatch(deleteContact(contact.IdContact))
    } catch (error) {
        console.error("Error deleteing contact:", error);
    }
  }

  return (
    <div className="col card-cont">
      <div className="card mb-3 card-contact">
        <div className="card-inner">
          <div className="profile-pic-container">
            <img src={contact.ProfilePic} className="card-img profile-pic" alt="Profile" />
          </div>
          <div className="info">
            <div className="card-body">
              <h5 className="card-title name">{contact.Name}</h5>
              <button className="btn-edit" onClick={handleEdit}>
                <FontAwesomeIcon icon={faGreaterThan} />
              </button>
            </div>
            <div className='second-row'>
              <p className="card-text">{contact.Title}</p>
              <button className="btn-delete" onClick={handleDelete}>
                <FontAwesomeIcon icon={faTrash} className="trash-icon"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactCard;