import '../styles/ConfirmAdd.css';


const ConfirmAdd = ({ onSave }) => {
    return (
        <div className="button-container">
            <button className="btn-add" onClick={onSave}>
                Confirm Contact
            </button>
        </div>
    );
};

export default ConfirmAdd;