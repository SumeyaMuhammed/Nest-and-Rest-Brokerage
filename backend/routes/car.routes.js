const express = require('express');
const router = express.Router();
const carController = require('../controllers/car.controller');
const upload = require('../middleware/upload'); // Import multer configuration

// Route to get all cars
router.get('/', carController.getAllCars);

// Route to get a specific car by its ID
router.get('/:id', carController.getCarById);

// Route to add a new car with image upload
router.post('/add',verifyToken, restrictTo(['admin']), upload.single('image'), carController.addCarWithImage);

// Route to update a car by its ID (with optional image upload)
router.put('/update/:id',verifyToken, restrictTo(['admin']), upload.single('image'), carController.updateCarWithImage);

// Route to delete a car by its ID
router.delete('/delete/:id',verifyToken, restrictTo(['admin']), carController.deleteCar);

module.exports = router;

