const AppointmentDetails = ({ appointment }) => {
    return(
        <div className="user-details">
            <h4>{appointment.id}</h4>
            <p><strong>Service Name: </strong>{appointment.serviceId}</p>
            <p><strong>Provider Name: </strong>{appointment.providerId}</p>
            <p><strong>Appointment Date: </strong>{appointment.appointmentDate}</p>
            <p><strong>Notes: </strong>{appointment.additionalInfo}</p>
        </div>
    )
}

export default AppointmentDetails;