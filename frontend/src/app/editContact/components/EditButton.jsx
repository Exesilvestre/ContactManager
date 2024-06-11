import '../styles/EditButton.css';


const EditButton = ({ onEditClick }) => {
    return (
        <div className="button-container-ledger">
            <button className="btn-edit-ledger" onClick={onEditClick}>
                EDIT
            </button>
        </div>
    );
};

export default EditButton;