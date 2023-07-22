import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const AppointmentForm = () => {
  const [services, setServices] = useState([]);
  const [providers, setProviders] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch services data from the backend
    const fetchServices = async () => {
      try {
        const response = await axios.get('/services'); // Replace with your API endpoint for fetching services
        const servicesData = response.data;
        setServices(servicesData);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  const handleServiceChange = async (event) => {
    const serviceId = event.target.value;
    setSelectedService(serviceId);
    try {
      const response = await axios.get('/providers'); // Replace with your API endpoint for fetching providers associated with a service
      const providersData = response.data;
      setProviders(providersData);
    } catch (error) {
      console.error('Error fetching providers:', error);
    }
  };

  const handleProviderChange = (event) => {
    const providerId = event.target.value;
    setSelectedProvider(providerId);
  };

  const handleDateChange = (date) => {
    setAppointmentDate(date);
  };

  const handleAdditionalInfoChange = (event) => {
    setAdditionalInfo(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the form inputs
    if (!selectedService || !selectedProvider || !appointmentDate) {
      setErrorMessage('Please fill in all the required fields');
      return;
    }

    try {
      // Send the appointment data to the backend for creation
      const response = await axios.post('/appointments', {
        providerId: selectedProvider,
        serviceId: selectedService,
        appointmentDate,
        additionalInfo,
      }); // Replace with your API endpoint for creating appointments

      // Reset form inputs and error message
      setSelectedService('');
      setSelectedProvider('');
      setAppointmentDate(new Date());
      setAdditionalInfo('');
      setErrorMessage('');

      console.log('Appointment created:', response.data);
      // Show a success message to the user
      alert('Appointment scheduled successfully');
    } catch (error) {
      console.error('Error creating appointment:', error);
      setErrorMessage('Failed to create appointment. Please try again.');
    }
  };

  return (
    <div>
      <h2>Schedule an Appointment</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="service">Service:</label>
          <select id="service" value={selectedService} onChange={handleServiceChange}>
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.serviceName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="provider">Provider:</label>
          <select id="provider" value={selectedProvider} onChange={handleProviderChange}>
            <option value="">Select a provider</option>
            {providers.map((provider) => (
              <option key={provider.id} value={provider.id}>
                {provider.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Date:</label>
          <Calendar value={appointmentDate} onChange={handleDateChange} />
        </div>
        <div>
          <label htmlFor="additional-info">Additional Info:</label>
          <textarea
            id="additional-info"
            value={additionalInfo}
            onChange={handleAdditionalInfoChange}
          ></textarea>
        </div>
        <button type="submit">Schedule Appointment</button>
      </form>
    </div>
  );
};

export default AppointmentForm;
