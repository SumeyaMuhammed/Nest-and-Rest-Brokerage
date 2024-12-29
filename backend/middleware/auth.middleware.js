const jwt = require('jsonwebtoken');

// Map numeric role IDs to role names
const roleMap = {
    1: 'admin',  // role_id 1 is admin
    2: 'user',   // role_id 2 is user
};

// Middleware to verify token
exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    // Check if token is present
    if (!token) {
        return res.status(403).json({ error: 'Token is required' });
    }

    // Split the 'Bearer' from the token value
    const bearerToken = token.split(' ')[1];  // Get the token part after 'Bearer'

    if (!bearerToken) {
        return res.status(403).json({ error: 'Token is required' });
    }

    try {
        // Decode the JWT using the secret
        const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);

        // Attach the decoded token data to the request object
        req.user = decoded;
        next();
    } catch (error) {
        // Handle specific JWT errors for clarity
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token has expired' });
        }
        console.error(error);
        return res.status(401).json({ error: 'Invalid token' });
    }
};

// Middleware to restrict access based on role
exports.restrictTo = (roles) => {
    return (req, res, next) => {
        // Map the numeric role ID from the token to a role string
        const userRole = roleMap[req.user.role] || req.user.role;  // Supports both numeric IDs and role names


        if (!roles.includes(userRole)) {
            console.error('Access denied for role:', userRole);
            return res.status(403).json({ error: 'Access denied' });
        }

        next();
    };
};
