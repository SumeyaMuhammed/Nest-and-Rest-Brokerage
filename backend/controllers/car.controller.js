const db = require('../database/dbconfig');
const path = require('path');

// Function to get all cars
exports.getAllCars = (req, res) => {
    db.query('SELECT * FROM Car', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Database error');
        }

        // Check if results array is empty
        if (results.length === 0) {
            return res.status(404).send('No cars found');
        }

        // Return the results if cars are found
        res.json(results);
    });
};

// Function to get a specific car by ID
exports.getCarById = (req, res) => {
    const carId = req.params.id;

    db.query('SELECT * FROM Car WHERE car_id = ?', [carId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Database error');
        }

        if (results.length === 0) {
            return res.status(404).send('Car not found');
        }

        res.json(results[0]);
    });
};

// Function to add a new car with image upload
exports.addCarWithImage = (req, res) => {
    const { title, description, price, make, model, year, mileage, color, broker_id } = req.body;
    console.log('Received body:', req.body); // Log request body
    console.log('Received file:', req.file); // Log uploaded file information
    // Get the uploaded image path from Multer
    const imageUrl = req.file ? 'uploads/' + req.file.filename : null; // Ensure to set the path relative to your root folder

    // Insert the new car into the database along with the image path
    db.query(
        'INSERT INTO Car (title, description, price, make, model, year, mileage, color, broker_id, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [title, description, price, make, model, year, mileage, color, broker_id, imageUrl],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Database error');
                
            }

            res.status(201).send('Car added successfully with image');
        }
    );
};

// Function to update a car with image upload
exports.updateCarWithImage = (req, res) => {
    console.log('Received body:', req.body); 
    const carId = req.params.id;
    console.log('Received file:', req.file); 
    const { title, description, price, make, model, year, mileage, color, broker_id } = req.body;

    // Get the uploaded image path from Multer
    const imageUrl = req.file ? 'uploads/' + req.file.filename : null;

    // Update the car details along with the image URL
    db.query(
        'UPDATE Car SET title = ?, description = ?, price = ?, make = ?, model = ?, year = ?, mileage = ?, color = ?, broker_id = ?, image_url = ? WHERE car_id = ?',
        [title, description, price, make, model, year, mileage, color, broker_id, imageUrl, carId],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Database error');
            }

            if (results.affectedRows === 0) {
                return res.status(404).send('Car not found');
            }

            res.send('Car updated successfully with new image');
        }
    );
};

// Function to delete a car by ID
exports.deleteCar = (req, res) => {
    const carId = req.params.id;
    console.log('Deleting car with ID:', carId); 
    console.log('Received carId:', carId);
    // Delete the car from the database
    db.query('DELETE FROM Car WHERE car_id = ?', [carId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Database error');
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('Car not found');
        }

        res.send('Car deleted successfully');
    });
};
