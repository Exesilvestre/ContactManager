import '../styles/ConfirmAdd.css';
import {useState, useEffect} from 'react'


const ConfirmAdd = ({ onSave, newContact }) => {
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const allFieldsCompleted = Object.values(newContact).every(field => !!field);
        setIsFormValid(allFieldsCompleted);
    }, [newContact]);
    return (
        <div className="button-container">
            <button className="btn-add" onClick={onSave} disabled={!isFormValid}>
                Confirm Contact
            </button>
        </div>
    );
};

export default ConfirmAdd;