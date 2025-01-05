const express = require('express');
const router = express.Router();
const carController = require('../controllers/car.controller');
const { verifyToken, restrictTo } = require('../middleware/auth.middleware');

// Route to get all cars
router.get('/', carController.getAllCars);

// Route to get a specific car by its ID
router.get('/:id', carController.getCarById);

// Route to add a new car (image URL provided by frontend)
router.post('/add', verifyToken, restrictTo(['admin']), carController.addCarWithImage);

// Route to update a car by its ID (image URL provided by frontend)
router.put('/update/:id', verifyToken, restrictTo(['admin']), carController.updateCarWithImage);

// Route to delete a car by its ID
router.delete('/delete/:id', verifyToken, restrictTo(['admin']), carController.deleteCar);

module.exports = router;
