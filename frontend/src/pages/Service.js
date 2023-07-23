import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const ServicesPage = () => {
  const { auth_user } = useAuthContext();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        if (!auth_user) {
          throw new Error('User not authenticated.');
        }

        const response = await fetch('/services', {
          headers: {
            'Authorization': `Bearer ${auth_user.token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch services.');
        }

        const data = await response.json();
        setServices(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchServices();
  }, [auth_user]);

  if (!auth_user) {
    return <p>Please log in to view services.</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Services</h1>
      {services.map((service) => (
        <div key={service.id}>
          <h3>{service.name}</h3>
          <p>{service.description}</p>
          {/* Other service details */}
        </div>
      ))}
    </div>
  );
};

export default ServicesPage;
