const express = require('express');
const router = express.Router();
const houseController = require('../controllers/house.controller');
const { verifyToken, restrictTo } = require('../middleware/auth.middleware');
const multer = require('multer');
const path = require('path');


// Set up Multer for image uploading
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });

// Define house-related routes
router.get('/', houseController.getAllHouses); // Get all houses
router.get('/:id', houseController.getHouseById); // Get a specific house by ID
router.post('/',verifyToken, restrictTo(['admin']), upload.single('image'), houseController.addHouseWithImage); // Add a new house with image
router.put('/update/:id',verifyToken, restrictTo(['admin']), upload.single('image'), houseController.updateHouseWithImage); // Update house details
router.delete('/delete/:id',verifyToken, restrictTo(['admin']), houseController.deleteHouse); // Delete a house

// Export the router to be used in app.js
module.exports = router;
