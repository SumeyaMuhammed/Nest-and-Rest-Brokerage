const db = require('../database/dbconfig');

// Function to get all cars
exports.getAllCars = (req, res) => {
    const query = `
        SELECT Car.*, Broker.email, Broker.phone
        FROM Car
        JOIN Broker ON Car.broker_id = Broker.broker_id
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Database error');
        }

        if (results.length === 0) {
            return res.status(404).send('No cars found');
        }

        res.json(results);
    });
};

// Function to get a specific car by ID
exports.getCarById = (req, res) => {
    const carId = req.params.id;

    const query = `
        SELECT Car.*, Broker.email, Broker.phone
        FROM Car
        JOIN Broker ON Car.broker_id = Broker.broker_id
        WHERE Car.car_id = ?
    `;

    db.query(query, [carId], (err, results) => {
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

// Function to add a new car (without file upload)
exports.addCarWithImage = (req, res) => {
    const { title, description, price, make, model, year, mileage, color, image_url, name } = req.body;
    console.log('Received body:', req.body); // Debugging logs

    // Find broker_id using the provided name
    db.query(
        'SELECT broker_id FROM Broker WHERE name = ?',
        [name],
        (err, brokerResults) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Database error while fetching broker');
            }

            if (brokerResults.length === 0) {
                return res.status(404).send('Broker not found');
            }

            const broker_id = brokerResults[0].broker_id;

            // Insert the car details including the image URL
            db.query(
                'INSERT INTO Car (title, description, price, make, model, year, mileage, color, broker_id, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [title, description, price, make, model, year, mileage, color, broker_id, image_url],
                (err, results) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send('Database error');
                    }

                    res.status(201).send('Car added successfully');
                }
            );
        }
    );
};

// Function to update a car (without file upload)
exports.updateCarWithImage = (req, res) => {
    const carId = req.params.id;
    const { title, description, price, make, model, year, mileage, color, image_url, name } = req.body;

    // Find broker_id using the provided name
    db.query(
        'SELECT broker_id FROM Broker WHERE name = ?',
        [name],
        (err, brokerResults) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Database error while fetching broker');
            }

            if (brokerResults.length === 0) {
                return res.status(404).send('Broker not found');
            }

            const broker_id = brokerResults[0].broker_id;

            // Update the car details including the image URL
            db.query(
                'UPDATE Car SET title = ?, description = ?, price = ?, make = ?, model = ?, year = ?, mileage = ?, color = ?, broker_id = ?, image_url = ? WHERE car_id = ?',
                [title, description, price, make, model, year, mileage, color, broker_id, image_url, carId],
                (err, results) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send('Database error during update');
                    }

                    if (results.affectedRows === 0) {
                        return res.status(404).send('Car not found');
                    }

                    res.send('Car updated successfully');
                }
            );
        }
    );
};

// Function to delete a car
exports.deleteCar = (req, res) => {
    const carId = req.params.id;

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
