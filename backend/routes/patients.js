//patients.js
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

router.get('/:patientId', async(req, res) => {
    const patientId = req.params.patientId;
    try {
        const user = await Patient.findByPk(patientId);
  
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error Specified user not found:', error);
        res.status(500).json({error: 'User not found'})
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
    const patientId = req.params.id;
    try {
        const patient = await Patient.findByPk(patientId);
      if (!patient) {
        return res.status(404).json({Note: 'Patient not found'});
      }
        await Patient.destroy({where:{id: patientId}});
        res.status(200).json({message: 'Patient deleted successfuly'});
    } catch(error) {
        console.error('Deletion Error', error);
        res.status(500).json({message: 'Failed to delete Patient'});
    }
});

module.exports = router;