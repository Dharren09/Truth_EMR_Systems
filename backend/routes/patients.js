const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { authenticateToken } = require('../middlewares/middleware');

router.get('/', patientController.getAllPatients);
router.get('/:patientId', authenticateToken('patient'), patientController.getPatientById);
router.put('/:id', authenticateToken('patient'), patientController.updatePatient);
router.delete('/:id', patientController.deletePatient);

module.exports = router;