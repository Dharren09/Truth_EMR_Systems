const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const { authenticateToken } = require('../middlewares/middleware');


router.get('/', authenticateToken('patient'), serviceController.getServices);
router.get('/:id',authenticateToken('provider', 'patient'), serviceController.getServiceById);
router.get('/providers/:serviceId',authenticateToken('patient'), serviceController.getServiceProviders);
router.post('/', authenticateToken('provider'), serviceController.createService);
router.put('/:id', authenticateToken('provider'), serviceController.updateService);
router.delete('/:id', authenticateToken('provider'), serviceController.deleteService);

module.exports = router;