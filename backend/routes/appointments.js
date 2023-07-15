//appointments.js
const express = require('express');
const router = express.Router();
const { authenticateTokenPat } = require('../middlewares/patientmw');
const appointmentController = require('../controllers/appointmentController');


router.get('/', appointmentController.getAppointments);
router.post('/', authenticateTokenPat, appointmentController.createAppointment);
router.put('/:id', appointmentController.updateAppointment);
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;