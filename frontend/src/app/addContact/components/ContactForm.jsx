import '../styles/contactForm.css';
import { useEffect, useRef,useState } from 'react';

const ContactForm = ({ onInputChange, onFileChange }) => {
    const addressInputRef = useRef(null);
    const fileInputRef = useRef(null); 
    const [selectedFileName, setSelectedFileName] = useState('');
    

    useEffect(() => {
        const autocomplete = new google.maps.places.Autocomplete(addressInputRef.current, {
            fields: ['formatted_address'],
            types: ['address'],
        });

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (!place.formatted_address) {
                console.error("No address available for input");
                return;
            }

            onInputChange({
                target: {
                    name: "address",
                    value: place.formatted_address,
                }
            });
        });

    }, [onInputChange]);

    const handleFileChange = async (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFileName(file.name);
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'ml_default');

            try {
                const response = await fetch('https://api.cloudinary.com/v1_1/ddjhhlt7w/upload', {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();
                const profilePictureUrl = data.secure_url;

                onFileChange(profilePictureUrl);
            } catch (error) {
                console.error("Error uploading image to Cloudinary:", error);
            }
        }else{
            setSelectedFileName('');
            const profilePictureUrl = e.target.value
            onFileChange(profilePictureUrl)
        }
    };

    return (
        <form className="contact-form">
            <div className="row">
                <div className="col-md-6">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name:</label>
                        <input type="text" placeholder='Enter contacts name' className="form-control" id="name" onChange={onInputChange} name="name" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title:</label>
                        <input type="text" placeholder='Enter contacts title' className="form-control" id="title" onChange={onInputChange} name="title" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="profilePicture" className="form-label">Profile Picture</label>
                        <div className="input-group">
                            <input type="url" className="form-control" placeholder="Enter URL or Upload" onChange={handleFileChange} />
                            <input 
                                type="file" 
                                className="form-control" 
                                ref={fileInputRef} 
                                onChange={handleFileChange} 
                                style={{ display: 'none' }}
                            />
                            <i className="bi bi-upload" onClick={() => fileInputRef.current.click()}></i>
                        </div>
                        {selectedFileName && (
                            <div>{selectedFileName}</div>
                        )}
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address:</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="address" 
                            ref={addressInputRef} 
                            required
                            placeholder='Enter contacts address'
                        />                   
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone:</label>
                        <input type="tel" placeholder='Enter contacts phone' className="form-control" id="phone" onChange={onInputChange} name="phone" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input type="email" placeholder='Enter contacts email' className="form-control" id="email" onChange={onInputChange} name="email" required />
                    </div>
                </div>
            </div>
        </form>
    );
}

export default ContactForm;