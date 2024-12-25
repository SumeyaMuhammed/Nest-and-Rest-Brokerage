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
        return res.status(403).send('Token is required');
    }

    // Split the 'Bearer' from the token value
    const bearerToken = token.split(' ')[1];  // Get the token part after 'Bearer'
    
    if (!bearerToken) {
        return res.status(403).send('Token is required');
    }

    try {
        // Decode the JWT using the secret
        const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
        req.user = decoded;  // Attach the decoded token data to the request object
        next();
    } catch (error) {
        console.error(error);
        res.status(401).send('Invalid or expired token');
    }
};

// Middleware to restrict access based on role
exports.restrictTo = (roles) => {
    return (req, res, next) => {
        // Map the numeric role ID from the token to a role string
        const userRole = roleMap[req.user.role];  // `roleMap[1]` will return 'admin'

        console.log('User role from token:', userRole);
        console.log('Allowed roles:', roles);

        if (!roles.includes(userRole)) {
            console.error('Access denied for role:', userRole);
            return res.status(403).send('Access denied');
        }

        next();
    };
};
