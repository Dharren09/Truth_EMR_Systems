//appointments.js
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/middleware');
const appointmentController = require('../controllers/appointmentController');


router.get('/', authenticateToken('patient','provider'),appointmentController.getAppointments);
router.get('/:id', appointmentController.getAppointmentById);
router.get('/:id/my-appointments', authenticateToken('patient','provider'), appointmentController.getMyAppointments);
router.post('/', authenticateToken('patient'), appointmentController.createAppointment);
router.put('/:id', authenticateToken('patient'), appointmentController.updateAppointment);
router.delete('/:id', authenticateToken('patient'), appointmentController.deleteAppointment);

module.exports = router;