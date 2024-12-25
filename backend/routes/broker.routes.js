const express = require('express');
const router = express.Router();
const brokerController = require('../controllers/broker.controller');

// Route to get all brokers
router.get('/', brokerController.getAllBrokers);

// Route to get a broker by ID
router.get('/:id', brokerController.getBrokerById);

// Route to add a new broker
router.post('/',verifyToken, restrictTo(['admin']), brokerController.addBroker);

// Route to update a broker
router.put('/:id',verifyToken, restrictTo(['admin']), brokerController.updateBroker);

// Route to delete a broker
router.delete('/:id',verifyToken, restrictTo(['admin']), brokerController.deleteBroker);

module.exports = router;
