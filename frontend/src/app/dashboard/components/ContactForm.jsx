

const ContactForm = ({ onInputChange }) => {
    return (
        <form className="contact-form">
            <div className="row">
                <div className="col-md-6">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name:</label>
                        <input type="text" className="form-control" id="name" onChange={onInputChange} name="name" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title:</label>
                        <input type="text" className="form-control" id="title" onChange={onInputChange} name="title" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="profilePicture" className="form-label">Profile Picture:</label>
                        <input type="text" className="form-control" id="profilePicture" onChange={onInputChange} name="profilePicture" required />
                        <i className="bi bi-upload"></i>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address:</label>
                        <input type="text" className="form-control" id="address" onChange={onInputChange} name="address" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone:</label>
                        <input type="tel" className="form-control" id="phone" onChange={onInputChange} name="phone" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input type="email" className="form-control" id="email" onChange={onInputChange} name="email" required />
                    </div>
                </div>
            </div>
        </form>
    );
}

export default ContactForm;
