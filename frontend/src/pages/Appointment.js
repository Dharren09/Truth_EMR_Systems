import { useEffect, useState } from 'react';

import AppointmentDetails  from '../components/AppointmentDetails'
import AppointmentForm  from '../components/AppointmentForm'


const Appointment = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await fetch('/appointments');
      const json = await response.json();

      if (response.ok) {
        setAppointments(json);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <div className="home">
      <div className="appointments">
        {appointments && appointments.map((appointment) => (
          <AppointmentDetails key={appointment.id} appointment={appointment} />
        ))}
      </div>
      <AppointmentForm />
    </div>
  );
};

export default Appointment;