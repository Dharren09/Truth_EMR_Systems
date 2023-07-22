const ServiceDetails = ({ service }) => {
    return(
        <div className="user-details">
            <h4>{service.serviceName}</h4>
            <p><strong>Description: </strong>{service.description}</p>
            <p><strong>Price: </strong>{service.price}</p>
        </div>
    )
}

export default ServiceDetails;