//services.js
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/middleware');
const { Service } = require('../models');
const { Provider } = require('../models');
const { Op } = require('sequelize');
const sequelize = require('sequelize');


router.get('/', async(req, res) => {
    try {
        const service = await Service.findAll();
        res.json(service);
    } catch(error) {
        console.error('Error retrieving Services:', error );
        res.status(500).json({ error: 'No Services found'});
    }
});

router.post('/', authenticateToken, async (req, res) => {
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
    console.error('Error Creating service:', error);
    res.status(500).json({ error: 'Failed to create Service' });
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
    const service = await Service.findByPk(req.params.id)
    .then((service) => {
        if (service) {
            Object.assign(service, req.body);
            return service.save();
        } else {
            throw new Error('Service not Found');
        }
    })
    .then((updatedService) => {
        console.log('Service Updated:', updatedService.toJSON());
        res.status(200).json(updatedService);
    })
    .catch((error) => {
        console.error('Error updating Service:', error);
        res.status(500).json({ error: 'Failed to update Service' });
    });
});

router.delete('/:id', authenticateToken, async(req, res) => {
    const serviceId = req.params.id;
    try {
        await Service.destroy({where:{id: serviceId}});
        res.status(200).json({message: 'Service deleted successfuly'});
    } catch(error) {
        console.error('Deletion Error', error);
        res.status(500).json({message: 'Failed to delete Service'});
    }
});

module.exports = router;