//routes/providers
const express = require('express');
const router = express.Router();
const { Provider, Service, ProviderService } = require('../models');
const { authenticateToken } = require('../middlewares/middleware');

router.get('/', async(req, res) => {
    try {
        const providers = await Provider.findAll();
        res.status(200).json(providers);
    } catch(error) {
        console.error('Error getting providers:', error);
        res.status(500).json({error: 'No provider found'});
    }
});

router.get('/:providerId', async(req, res) => {
  const providerId = req.params.providerId;
  try {
      const user = await Provider.findByPk(providerId);

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
  } catch (error) {
      console.error('Error Specified user not found:', error);
      res.status(500).json({error: 'User not found'})
  }
});

// Fetch services associated with a specific provider
router.get('/:providerId/services', authenticateToken('provider'), async (req, res) => {
  //check if the user is logged in or authorised
  if (!req.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const providerId = req.userId
  
    try {
      // Find the provider by ID
      const provider = await Provider.findOne({where: {userId: providerId }});
      if (!provider) {
        console.error('Provider not Found by token:', error);
        return res.status(404).json({ error: 'Provider not found' });
      }
  
      // Fetch the services associated with the provider
      const services = await Service.findAll({
        include: [
          {
            model: Provider,
            where: { id: provider.id },
            through: { attributes: [] }, // Exclude join table attributes
          },
        ],
      });
  
      res.json(services);
    } catch (error) {
      console.error('Error fetching provider services:', error);
      res.status(500).json({ error: 'Failed to fetch provider services' });
    }
  });

router.put('/:id', async(req, res) => {
    const provider = await Provider.findByPk(req.params.id)
    .then((provider) => {
        if (provider) {
            Object.assign(provider, req.body);
            return provider.save();
        } else {
            throw new Error('Provider not Found');
        }
    })
    .then((updatedProvider) => {
        console.log('Provider Updated:', updatedProvider.toJSON());
        res.status(200).json(updatedProvider);
    })
    .catch((error) => {
        console.error('Error updating Provider:', error);
        res.status(500).json({ error: 'Failed to update Provider' });
    });
});

router.delete('/:id', async(req, res) => {
    const providerId = req.params.id;
    try {
      const provider = await Provider.findByPk(providerId);
      if (!provider) {
        return res.status(404).json({Note: 'Provider not found'});
      }
        await Provider.destroy({where:{id: providerId}});
        res.status(200).json({message: 'Provider deleted successfuly'});
    } catch(error) {
        console.error('Deletion Error', error);
        res.status(500).json({message: 'Failed to delete Provider'});
    }
});

module.exports = router;