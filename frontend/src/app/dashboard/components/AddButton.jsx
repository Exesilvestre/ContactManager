import '../styles/AddButton.css';


const AddButton = ({ onAddClick }) => {
    return (
        <div className="button-container">
            <button className="btn-add" onClick={onAddClick}>
                Add New Contacts
            </button>
        </div>
    );
};

export default AddButton;