//routes/providers
const express = require('express');
const router = express.Router();
const { Provider } = require('../models');

router.get('/', async(req, res) => {
    try {
        const providers = await Provider.findAll();
        res.status(200).json(providers);
    } catch(error) {
        console.error('Error getting providers:', error);
        res.status(500).json({error: 'No provider found'});
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
        await Provider.destroy({where:{id: providerId}});
        res.status(200).json({message: 'Provider deleted successfuly'});
    } catch(error) {
        console.error('Deletion Error', error);
        res.status(500).json({message: 'Failed to delete Provider'});
    }
});

module.exports = router;