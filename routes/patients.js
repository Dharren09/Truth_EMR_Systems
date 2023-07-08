//patients routes
const express = require('express');
const router = express.Router();
const { Patient } = require('../models');


router.get('/', async(req, res) => {
    try {
        const patient = await Patient.findAll();
        res.json(patient);
    } catch(error) {
        console.error('Error retrieving Patients:', error );
        res.status(500).json({ error: 'No Patients found'});
    }
});

router.post('/', async(req, res) => {
    try {
        const patient = req.body;
        await Patient.create(patient);
        res.json(patient);
    } catch (error) {
        console.error('Error Creating patient:', error);
        res.status(500).json({ error: 'Failed to create Patient'});
    }
});

router.put('/:id', async (req, res) => {
    const patient = await Patient.findByPk(req.params.id)
    .then((patient) => {
        if (patient) {
            Object.assign(patient, req.body);
            return patient.save();
        } else {
            throw new Error('Patient not Found');
        }
    })
    .then((updatedPatient) => {
        console.log('Patient Updated:', updatedPatient.toJSON());
        res.status(200).json(updatedPatient);
    })
    .catch((error) => {
        console.error('Error updating Patient:', error);
        res.status(500).json({ error: 'Failed to update Patient' });
    });
});

router.delete('/:id', async(req, res) => {
    const patient = await Patient.findByPk(req.params.id)
    .then((patient) => {
        if (patient) {
            return patient.destroy();
        } else {
            throw new Error('Patient Not Found');
        }
    })
    .then(() => {
        console.log('Patient deleted');
    })
    .catch((error) => {
        console.error('Error Deleting Patient:', error);
    });
});

module.exports = router;