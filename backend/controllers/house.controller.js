const db = require('../database/dbconfig');
const path = require('path');

exports.getAllHouses = (req, res) => {
    const query = `
    SELECT House.*, Broker.email, Broker.phone
    FROM House
    JOIN Broker ON House.broker_id = Broker.broker_id
    `;

    db.query(query, (err, results) => {
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

exports.getHouseById = (req, res) => {
    const houseId = req.params.id;

    const query = `
        SELECT House.*, Broker.email, Broker.phone
        FROM House
        JOIN Broker ON House.broker_id = Broker.broker_id
        WHERE House.house_id = ?
    `;

    db.query(query, [houseId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Database error');
        }

        if (results.length === 0) {
            return res.status(404).send('House not found');
        }

        res.json(results[0]);
        console.log(results[0]);
    });
};

exports.addHouseWithImage = (req, res) => {
    const { title, description, price, num_bedrooms, num_bathrooms, area_sqft, location, broker_id } = req.body;

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

exports.updateHouseWithImage = (req, res) => {
    const houseId = req.params.id;
    const { title, description, price, num_bedrooms, num_bathrooms, area_sqft, location, broker_id } = req.body;
    
    const imageUrl = req.file ? 'uploads/' + req.file.filename : null;
    
    db.query(
        'SELECT image_url FROM House WHERE house_id = ?',
        [houseId],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Database error');
            }
            
            if (results.length === 0) {
                return res.status(404).send('House not found');
            }
            
            const currentImageUrl = results[0].image_url;
            const updatedImageUrl = imageUrl || currentImageUrl;
            
            db.query(
                'UPDATE House SET title = ?, description = ?, price = ?, num_bedrooms = ?, num_bathrooms = ?, area_sqft = ?, location = ?, broker_id = ?, image_url = ? WHERE house_id = ?',
                [title, description, price, num_bedrooms, num_bathrooms, area_sqft, location, broker_id, updatedImageUrl, houseId],
                (updateErr, updateResults) => {
                    if (updateErr) {
                        console.error(updateErr);
                        return res.status(500).send('Database error during update');
                    }
                    
                    if (updateResults.affectedRows === 0) {
                        return res.status(404).send('House not found');
                    }
                    
                    res.send('House updated successfully');
                }
            );
        }
    );
};

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
