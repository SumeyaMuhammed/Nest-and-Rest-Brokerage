const db = require('../database/dbconfig');
const { sendEmail } = require('../utils/email');

// Function to assign a broker to a property
exports.assignBroker = async (req, res) => {
    const { propertyId, location } = req.body;

    try {
        // Find a broker by location (ensure the location matches the address column in the Broker table)
        const availableBroker = await db.query(
            'SELECT * FROM Broker WHERE address LIKE ? AND status = "available" LIMIT 1',
            [`%${location}%`]
        );

        if (availableBroker.length > 0) {
            const broker = availableBroker[0];

            // Assign the broker to the property (Assuming you have a broker_id in the Properties table)
            await db.query(
                'UPDATE Properties SET broker_id = ? WHERE property_id = ?',
                [broker.broker_id, propertyId]
            );

            // Fetch the property details for email notification
            const property = await db.query(
                'SELECT title, address FROM Properties WHERE property_id = ?',
                [propertyId]
            );

            // Send email to the broker notifying about the new property assignment
            await sendEmail(
                broker.email,
                'New Property Assignment',
                `
                    <h1>Hello ${broker.name},</h1>
                    <p>You have been assigned a new property:</p>
                    <ul>
                        <li><strong>Title:</strong> ${property[0].title}</li>
                        <li><strong>Location:</strong> ${property[0].address}</li>
                    </ul>
                    <p>Please log in to your dashboard to view the details.</p>
                    <p>Thank you,</p>
                    <p>Your Company</p>
                `
            );

            // Respond with success
            res.status(200).json({ message: 'Broker assigned successfully', broker });
        } else {
            throw new Error('No available brokers for the specified location');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
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

            // Get the newly inserted broker data (including the broker_id)
            const newBroker = {
                broker_id: results.insertId,  // Get the generated broker_id
                name,
                email,
                phone,
                address,
                status
            };

            // Send the full broker data as the response
            res.status(201).json(newBroker);
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
