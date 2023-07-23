import React, { useEffect, useState } from 'react';
import AppointmentDetails from '../components/AppointmentDetails';
import AppointmentForm from '../components/AppointmentForm';
import { useAuthContext } from "../hooks/useAuthContext"

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {auth_user} = useAuthContext()

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('/appointments', {
          headers: {
            'Authorization': `Bearer ${auth_user.token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Unauthorized: Please login again.');
          }
          throw new Error('Failed to fetch appointments');
        }

        const json = await response.json();
        setAppointments(json);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [auth_user.token]);

  return (
    <div className="home">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="appointments">
          {appointments.length === 0 ? (
            <p>No appointments found.</p>
          ) : (
            appointments.map((appointment) => (
              <AppointmentDetails key={appointment.id} appointment={appointment} />
            ))
          )}
        </div>
      )}
      <AppointmentForm />
    </div>
  );
};

export default Appointment;