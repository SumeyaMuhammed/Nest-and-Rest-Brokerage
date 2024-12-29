const db = require('../database/dbconfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user (Public)
exports.registerUser = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        if (!username || !password || !email) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
            'INSERT INTO User (username, password, email, role_id) VALUES (?, ?, ?, ?)',
            [username, hashedPassword, email, 2], // Default role_id = 2 (user)
            (err, results) => {
                if (err) {
                    console.error("Database Error:", err.message);
                    if (err.code === 'ER_DUP_ENTRY') {
                        return res.status(400).json({
                            message: 'Username or email already exists',
                        });
                    }
                    return res.status(500).json({ message: 'Database error' });
                }

                // Get the inserted user ID (assuming user_id is auto-generated)
                const userId = results.insertId;

                // Generate JWT token after successful registration
                const token = jwt.sign(
                    { userId, username, role: 2 }, // Customize the payload as necessary
                    process.env.JWT_SECRET, // Ensure this secret is set in your environment variables
                    { expiresIn: '1h' } // Optional: set an expiration time for the token
                );

                // Respond with the token and any other necessary data (like role)
                res.status(201).json({
                    message: 'User registered successfully',
                    token: token,
                    role_id: 2, // Send back the user's role if necessary
                });
            }
        );
    } catch (error) {
        console.error("Server Error:", error.message);
        res.status(500).json({ message: 'Server error' });
    }
};
// Login user (Public)
// Login user (Public)
exports.loginUser = (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM User WHERE username = ?', [username], async (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Database error');
        }

        if (results.length === 0) {
            return res.status(404).send('User not found');
        }

        const user = results[0];
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).send('Invalid credentials');
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.user_id, role: user.role_id }, // Attach user_id and role to the token
            process.env.JWT_SECRET, // Use your JWT secret here
            { expiresIn: '1h' } // Set expiration for the token
        );

        // Send response with token and role_id
        res.json({ token, role_id: user.role_id }); // Include role_id in response
    });
};


// Get all users (Admin-only)
exports.getAllUsers = (req, res) => {
    db.query('SELECT user_id, username, email, role_id, status FROM User', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Database error');
        }
        res.json(results);
    });
};

// Get user by ID (Authenticated)
exports.getUserById = (req, res) => {
    const userId = req.params.id;

    db.query('SELECT user_id, username, email, role_id, status FROM User WHERE user_id = ?', [userId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Database error');
        }

        if (results.length === 0) {
            return res.status(404).send('User not found');
        }

        res.json(results[0]);
    });
};

// Add new user (Admin-only)
exports.addUser = async (req, res) => {
    const { username, password, email, role_id } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
            'INSERT INTO User (username, password, email, role_id) VALUES (?, ?, ?, ?)',
            [username, hashedPassword, email, role_id],
            (err, results) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Database error');
                }
                res.status(201).send('User added successfully');
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// Update user (Admin-only)
exports.updateUser = (req, res) => {
    const userId = req.params.id;
    const { username, email, role_id, status } = req.body;

    db.query(
        'UPDATE User SET username = ?, email = ?, role_id = ?, status = ? WHERE user_id = ?',
        [username, email, role_id, status, userId],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Database error');
            }

            if (results.affectedRows === 0) {
                return res.status(404).send('User not found');
            }

            res.send('User updated successfully');
        }
    );
};

// Delete user (Admin-only)
exports.deleteUser = (req, res) => {
    const userId = req.params.id;

    db.query('DELETE FROM User WHERE user_id = ?', [userId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Database error');
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('User not found');
        }

        res.send('User deleted successfully');
    });
};
