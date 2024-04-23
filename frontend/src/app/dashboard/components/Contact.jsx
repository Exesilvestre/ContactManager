

const Contact = ({ contact }) => (
  <div className="col">
    <div className="card mb-3" style={{ maxWidth: '540px' }}>
      <div className="row no-gutters">
        <div className="col-md-4">
          <img src="..." className="card-img" alt="..." />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{contact.name}</h5>
            <p className="card-text">{contact.description}</p>
            {/* Más detalles del contacto si es necesario */}
            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Contact;