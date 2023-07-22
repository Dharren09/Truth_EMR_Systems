const { Service, Provider, ProviderService } = require('../models');
const { Op } = require('sequelize');
const sequelize = require('sequelize');

exports.getServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.json(services);
  } catch (error) {
    console.error('Error retrieving services:', error);
    res.status(500).json({ error: 'Failed to retrieve services' });
  }
};


exports.getServiceProviders = async (req, res) => {
  const serviceId = req.params.serviceId;
  
  try {
    const serviceProviders = await Provider.findAll({
      include: [{
        model: Service,
        where: { id: serviceId },
        through: { attributes: []},
      },],
    });
    res.json(serviceProviders);
  } catch (error) {
    console.error('Error fetching associated providers', error);
    res.status(500).json({ error: 'Failed to fetch associated providers'});
  }
}
//
exports.getServiceById = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    console.error('Error fetching service by ID:', error);
    res.status(500).json({ error: 'Failed to fetch service by ID' });
  }
};
//

exports.createService = async (req, res) => {
  try {
    const { userId } = req; // Get the authenticated user ID from the request

    const serviceData = req.body;
    const { serviceName } = serviceData;

    // Check if the service already exists (case-insensitive comparison)
    const existingService = await Service.findOne({
      where: sequelize.where(
        sequelize.fn('LOWER', sequelize.col('serviceName')),
        {
          [Op.like]: '%' + serviceName.toLowerCase() + '%',
        }
      ),
    });

    let service;

    if (existingService) {
      // If the service already exists, use the existing service
      service = existingService;
    } else {
      // If the service doesn't exist, create a new service
      service = await Service.create(serviceData);
    }

    // Find the providers who created the service based on the user IDs
    const providers = await Provider.findAll({ where: { userId: userId } });

    if (!providers || providers.length === 0) {
      return res.status(404).json({ error: 'No providers found' });
    }

    // Associate the service with the providers in the junction table
    await service.addProviders(providers);

    res.json(service);
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ error: 'Failed to create service' });
  }
};

exports.updateService = async (req, res) => {
  const { id } = req.params;
  const { userId } = req; 

  try {
    const service = await Service.findByPk(id, {
      include: [Provider],
    });
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    const provider = await Provider.findOne({where:{userId: userId}})

    // Check if the authenticated user is one of the providers associated with the service
    const serviceProviders = service.Providers.map(provider => provider.id);
    if (!serviceProviders.includes(provider.id)) {
      return res.status(403).json({ error: 'You are not authorized to update this service' });
    }

    await service.update(req.body);
    res.json({ message: 'Service updated successfully' });
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ error: 'Failed to update service' });
  }
};

exports.deleteService = async (req, res) => {
  const { id } = req.params;
  const { userId } = req; 

  try {
    const service = await Service.findByPk(id, {
      include: [Provider],
    });
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    const provider = await Provider.findOne({where:{userId: userId}})

    // Check if the authenticated user is one of the providers associated with the service
    const serviceProviders = service.Providers.map(provider => provider.id);
    if (!serviceProviders.includes(provider.id)) {
      return res.status(403).json({ error: 'You are not authorized to delete this service' });
    }
    // Delete the service
    await service.destroy();

    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ error: 'Failed to delete service' });
  }
};