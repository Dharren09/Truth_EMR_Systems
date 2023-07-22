import { useEffect, useState } from 'react';

import ServiceDetails  from '../components/ServiceDetails'
import ServiceForm  from '../components/ServiceForm'


const Service = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const response = await fetch('/services');
      const json = await response.json();

      if (response.ok) {
        setServices(json);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="home">
      <div className="services">
        {services && services.map((service) => (
          <ServiceDetails key={service.id} service={service} />
        ))}
      </div>
      <ServiceForm />
    </div>
  );
};

export default Service;