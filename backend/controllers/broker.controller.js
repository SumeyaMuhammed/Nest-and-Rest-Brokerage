const db = require('../database/dbconfig');

// Function to get all brokers
exports.getAllBrokers = (req, res) => {
    db.query('SELECT * FROM Broker', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Database error');
        }

        if (results.length === 0) {
            return res.status(404).send('No brokers found');
        }

        res.json(results);
    });
};

// Function to get a specific broker by ID
exports.getBrokerById = (req, res) => {
    const brokerId = req.params.id;

    db.query('SELECT * FROM Broker WHERE broker_id = ?', [brokerId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Database error');
        }

        if (results.length === 0) {
            return res.status(404).send('Broker not found');
        }

        res.json(results[0]);
    });
};

// Function to add a new broker
exports.addBroker = (req, res) => {
    const { name, email, phone, address, status } = req.body;

    db.query(
        'INSERT INTO Broker (name, email, phone, address, status) VALUES (?, ?, ?, ?, ?)',
        [name, email, phone, address, status],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Database error');
            }

            res.status(201).send('Broker added successfully');
        }
    );
};

// Function to update a broker
exports.updateBroker = (req, res) => {
    const brokerId = req.params.id;
    const { name, email, phone, address, status } = req.body;

    db.query(
        'UPDATE Broker SET name = ?, email = ?, phone = ?, address = ?, status = ? WHERE broker_id = ?',
        [name, email, phone, address, status, brokerId],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Database error');
            }

            if (results.affectedRows === 0) {
                return res.status(404).send('Broker not found');
            }

            res.send('Broker updated successfully');
        }
    );
};

// Function to delete a broker
exports.deleteBroker = (req, res) => {
    const brokerId = req.params.id;

    db.query('DELETE FROM Broker WHERE broker_id = ?', [brokerId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Database error');
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('Broker not found');
        }

        res.send('Broker deleted successfully');
    });
};
