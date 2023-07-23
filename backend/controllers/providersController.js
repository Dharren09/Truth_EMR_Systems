//provider controller
const { Provider, Service, ProviderService } = require('../models');


exports.getAllProviders = async (req, res) => {
  try {
    const providers = await Provider.findAll();
    res.status(200).json(providers);
  } catch (error) {
    console.error('Error getting providers:', error);
    res.status(500).json({ error: 'Failed to fetch providers' });
  }
};

exports.getProviderById = async (req, res) => {
  const { userId } = req;
  
  try {
    const provider = await Provider.findOne({where: { userId: userId}});

    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }
    res.json(provider);
  } catch (error) {
    console.error('Error finding provider:', error);
    res.status(500).json({ error: 'Failed to fetch provider' });
  }
};

exports.getProviderServices = async (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const providerId = req.userId;

  try {
    const provider = await Provider.findOne({ where: { userId: providerId } });
    if (!provider) {
      return res.status(404).json({ error: 'Provider not found' });
    }

    const services = await Service.findAll({
      include: [
        {
          model: Provider,
          where: { id: provider.id },
          through: { attributes: [] },
        },
      ],
    });

    res.json(services);
  } catch (error) {
    console.error('Error fetching provider services:', error);
    res.status(500).json({ error: 'Failed to fetch provider services' });
  }
};

exports.updateProvider = async (req, res) => {
  const { userId } = req;
  try {
    const provider = await Provider.findOne({where: { userId: userId}});
    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    Object.assign(provider, req.body);
    const updatedProvider = await provider.save();

    console.log('Provider Updated:', updatedProvider.toJSON());
    res.status(200).json(updatedProvider);
  } catch (error) {
    console.error('Error updating provider:', error);
    res.status(500).json({ error: 'Failed to update provider' });
  }
};

exports.deleteProvider = async (req, res) => {
  const providerId = req.params.id;
  try {
    const provider = await Provider.findByPk(providerId);
    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    await Provider.destroy({ where: { id: providerId } });
    res.status(200).json({ message: 'Provider deleted successfully' });
  } catch (error) {
    console.error('Error deleting provider:', error);
    res.status(500).json({ message: 'Failed to delete provider' });
  }
};