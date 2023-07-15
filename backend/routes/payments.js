//payments routes
const express = require('express');
const router = express.Router();
const { Payment } = require('../models');


router.get('/', async(req, res) => {
    try {
        const payment = await Payment.findAll();
        res.json(payment);
    } catch(error) {
        console.error('Error retrieving Payments:', error );
        res.status(500).json({ error: 'No Payments found'});
    }
});

router.post('/', async(req, res) => {
    try {
        const payment = req.body;
        await Payment.create(payment);
        res.json(payment);
    } catch (error) {
        console.error('Error Creating payment:', error);
        res.status(500).json({ error: 'Failed to create Payment'});
    }
});

router.put('/:id', async (req, res) => {
    const payment = await Payment.findByPk(req.params.id)
    .then((payment) => {
        if (payment) {
            Object.assign(payment, req.body);
            return payment.save();
        } else {
            throw new Error('Payment not Found');
        }
    })
    .then((updatedPayment) => {
        console.log('Payment Updated:', updatedPayment.toJSON());
        res.status(200).json(updatedPayment);
    })
    .catch((error) => {
        console.error('Error updating Payment:', error);
        res.status(500).json({ error: 'Failed to update Payment' });
    });
});

router.delete('/:id', async(req, res) => {
    const paymentId = req.params.id;
    try {
        await Payment.destroy({where:{id: paymentId}});
        res.status(200).json({message: 'Payment deleted successfuly'});
    } catch(error) {
        console.error('Deletion Error', error);
        res.status(500).json({message: 'Failed to delete Payment'});
    }
});

module.exports = router;