//users routes
const express = require('express');
const router = express.Router();
const { User } = require('../models');


router.get('/', async(req, res) => {
    try {
        const user = await User.findAll();
        res.json(user);
    } catch(error) {
        console.error('Error retrieving Users:', error );
        res.status(500).json({ error: 'No Users found'});
    }
});

router.get('/:userId', async(req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findByPk(userId);

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
    const user = await User.findByPk(req.params.id)
    .then((user) => {
        if (user) {
            Object.assign(user, req.body);
            return user.save();
        } else {
            throw new Error('User not Found');
        }
    })
    .then((updatedUser) => {
        console.log('User Updated:', updatedUser.toJSON());
        res.status(200).json(updatedUser);
    })
    .catch((error) => {
        console.error('Error updating User:', error);
        res.status(500).json({ error: 'Failed to update User' });
    });
});

router.delete('/:id', async(req, res) => {
    const userId = req.params.id;
    try {
        await User.destroy({where:{id: userId}});
        res.status(200).json({message: 'User deleted successfuly'});
    } catch(error) {
        console.error('Deletion Error', error);
        res.status(500).json({message: 'Failed to delete User'});
    }
});

module.exports = router;