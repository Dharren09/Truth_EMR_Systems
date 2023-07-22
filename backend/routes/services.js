const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const { authenticateToken } = require('../middlewares/middleware');
const { authenticateTokenPat} = require('../middlewares/patientmw');

router.get('/', serviceController.getServices);
//router.get('/:id', serviceController.getServices);
router.get('/providers/:serviceId',authenticateTokenPat, serviceController.getServiceProviders);
//
router.post('/', authenticateToken('provider'), serviceController.createService);
router.put('/:id', authenticateToken('provider'), serviceController.updateService);
router.delete('/:id', authenticateToken('provider'), serviceController.deleteService);

module.exports = router;