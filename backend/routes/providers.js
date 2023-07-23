//routes/providers
const express = require('express');
const router = express.Router();
const providersController = require('../controllers/providersController');
const { authenticateToken } = require('../middlewares/middleware');

router.get('/', providersController.getAllProviders);
router.get('/:providerId',authenticateToken('provider'), providersController.getProviderById);
router.get('/:providerId/services', authenticateToken('provider'), providersController.getProviderServices);
router.put('/:id', authenticateToken('provider'), providersController.updateProvider);
router.delete('/:id',authenticateToken('provider'), providersController.deleteProvider);

module.exports = router;