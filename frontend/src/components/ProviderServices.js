import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext'

const ProviderServices = ({ providerId }) => {
    const { auth_user } = useAuthContext()

    const [providerServices, setProviderServices] = useState([]);

    useEffect(() => {
        const fetchProviderServices = async () => {
            if (!auth_user) {
                console.log('Please Login first')
            return
            }
            try {
                const response = await axios.get(`/providers/${auth_user.providerId}/services`, {
                    headers: {
                      Authorization: `Bearer ${auth_user.token}`,
                    },
                  });
                const services = response.data;
                setProviderServices(services);
                } catch (error) {
                console.error('Error fetching provider services:', error);
            }
        };

        fetchProviderServices();
    }, [auth_user]);

  // Render the provider's services
  return (
    <div className='home'>
    <h2>Your Services</h2>
    {providerServices.map((service) => (
      <div key={service.id} className="service-item">
        <div className="service-name">{service.serviceName}</div>
        <div className="service-description">{service.description}</div>
        <div className="service-price">{service.price}</div>
      </div>
    ))}
  </div>
  )
};

export default ProviderServices;
