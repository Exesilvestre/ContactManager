import '../styles/EditButton.css';


const EditButton = ({ onEditClick }) => {
    return (
        <div className="button-container">
            <button className="btn-edit" onClick={onEditClick}>
                EDIT
            </button>
        </div>
    );
};

export default EditButton;