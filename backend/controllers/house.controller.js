const db = require('../database/dbconfig');
const path = require('path');

// Function to get all houses
exports.getAllHouses = (req, res) => {
    db.query('SELECT * FROM House', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Database error');
        }

        if (results.length === 0) {
            return res.status(404).send('No houses found');
        }

        res.json(results);
    });
};

// Function to get a specific house by ID
exports.getHouseById = (req, res) => {
    const houseId = req.params.id;

    db.query('SELECT * FROM House WHERE house_id = ?', [houseId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Database error');
        }

        if (results.length === 0) {
            return res.status(404).send('House not found');
        }

        res.json(results[0]);
    });
};

// Function to add a new house with image upload
exports.addHouseWithImage = (req, res) => {
    const { title, description, price, num_bedrooms, num_bathrooms, area_sqft, location, broker_id } = req.body;

    // Get the uploaded image path from Multer
    const imageUrl = req.file ? 'uploads/' + req.file.filename : null;

    db.query(
        'INSERT INTO House (title, description, price, num_bedrooms, num_bathrooms, area_sqft, location, broker_id, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [title, description, price, num_bedrooms, num_bathrooms, area_sqft, location, broker_id, imageUrl],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Database error');
            }

            res.status(201).send('House added successfully with image');
        }
    );
};

// Function to update a house with image upload
exports.updateHouseWithImage = (req, res) => {
    const houseId = req.params.id;
    const { title, description, price, num_bedrooms, num_bathrooms, area_sqft, location, broker_id } = req.body;

    const imageUrl = req.file ? 'uploads/' + req.file.filename : null;

    db.query(
        'UPDATE House SET title = ?, description = ?, price = ?, num_bedrooms = ?, num_bathrooms = ?, area_sqft = ?, location = ?, broker_id = ?, image_url = ? WHERE house_id = ?',
        [title, description, price, num_bedrooms, num_bathrooms, area_sqft, location, broker_id, imageUrl, houseId],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Database error');
            }

            if (results.affectedRows === 0) {
                return res.status(404).send('House not found');
            }

            res.send('House updated successfully with new image');
        }
    );
};

// Function to delete a house by ID
exports.deleteHouse = (req, res) => {
    const houseId = req.params.id;

    db.query('DELETE FROM House WHERE house_id = ?', [houseId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Database error');
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('House not found');
        }

        res.send('House deleted successfully');
    });
};
