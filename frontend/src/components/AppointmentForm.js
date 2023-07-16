import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const AppointmentForm = () => {
  const [providers, setProviders] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch providers and services data from the backend
    const fetchProvidersAndServices = async () => {
      try {
        const response = await axios.get('/providers'); // Replace with your API endpoint for fetching providers
        const providersData = response.data;
        setProviders(providersData);

        // Fetch services for the first provider initially
        if (providersData.length > 0) {
          const firstProviderId = providersData[0].id;
          fetchServicesForProvider(firstProviderId);
        }
      } catch (error) {
        console.error('Error fetching providers:', error);
      }
    };

    fetchProvidersAndServices();
  }, []);

  const fetchServicesForProvider = async (providerId) => {
    try {
      const response = await axios.get(`/providers/${providerId}/services`); // Replace with your API endpoint for fetching services for a provider
      const servicesData = response.data;
      setServices(servicesData);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleProviderChange = (event) => {
    const providerId = event.target.value;
    setSelectedProvider(providerId);
    fetchServicesForProvider(providerId);
  };

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
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
    if (!selectedProvider || !selectedService || !appointmentDate) {
      setErrorMessage('Please fill in all the required fields');
      return;
    }

    try {
      // Send the appointment data to the backend for creation
      const response = await axios.post('/api/appointments', {
        providerId: selectedProvider,
        serviceId: selectedService,
        appointmentDate,
        additionalInfo,
      }); // Replace with your API endpoint for creating appointments

      // Reset form inputs and error message
      setSelectedProvider('');
      setSelectedService('');
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
          <label htmlFor="service">Service:</label>
          <select id="service" value={selectedService} onChange={handleServiceChange}>
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
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