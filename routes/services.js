//services routes
const express = require('express');
const router = express.Router();
const { Service } = require('../models');


router.get('/', async(req, res) => {
    try {
        const service = await Service.findAll();
        res.json(service);
    } catch(error) {
        console.error('Error retrieving Services:', error );
        res.status(500).json({ error: 'No Services found'});
    }
});

router.post('/', async(req, res) => {
    try {
        const service = req.body;
        await Service.create(service);
        res.json(service);
    } catch (error) {
        console.error('Error Creating service:', error);
        res.status(500).json({ error: 'Failed to create Service'});
    }
});

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async(req, res) => {
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