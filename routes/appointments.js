//appointments routes
const express = require('express');
const router = express.Router();
const { Appointment } = require('../models');


router.get('/', async(req, res) => {
    try {
        const appointment = await Appointment.findAll();
        res.json(appointment);
    } catch(error) {
        console.error('Error retrieving Appointments:', error );
        res.status(500).json({ error: 'No Appointments found'});
    }
});

router.post('/', async(req, res) => {
    try {
        const appointment = req.body;
        await Appointment.create(appointment);
        res.json(appointment);
    } catch (error) {
        console.error('Error Creating appointment:', error);
        res.status(500).json({ error: 'Failed to create Appointment'});
    }
});

router.put('/:id', async (req, res) => {
    const appointment = await Appointment.findByPk(req.params.id)
    .then((appointment) => {
        if (appointment) {
            Object.assign(appointment, req.body);
            return appointment.save();
        } else {
            throw new Error('Appointment not Found');
        }
    })
    .then((updatedAppointment) => {
        console.log('Appointment Updated:', updatedAppointment.toJSON());
        res.status(200).json(updatedAppointment);
    })
    .catch((error) => {
        console.error('Error updating Appointment:', error);
        res.status(500).json({ error: 'Failed to update Appointment' });
    });
});

router.delete('/:id', async(req, res) => {
    const appointmentId = req.params.id;
    try {
        await Appointment.destroy({where:{id: appointmentId}});
        res.status(200).json({message: 'Appointment deleted successfuly'});
    } catch(error) {
        console.error('Deletion Error', error);
        res.status(500).json({message: 'Failed to delete Appointment'});
    }
});

module.exports = router;