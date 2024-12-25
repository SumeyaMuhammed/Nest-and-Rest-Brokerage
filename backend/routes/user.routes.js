const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyToken, restrictTo } = require('../middleware/auth.middleware');

// Public routes
router.post('/register', userController.registerUser); // Public registration
router.post('/login', userController.loginUser);       // Public login

// Protected routes
router.get('/', verifyToken, restrictTo(['admin']), userController.getAllUsers); // Admin-only access
router.get('/:id', verifyToken, userController.getUserById);                     // Authenticated access
router.post('/add-user', verifyToken, restrictTo(['admin']), userController.addUser); // Admin-only access
router.put('/:id', verifyToken, restrictTo(['admin']), userController.updateUser);   // Admin-only access
router.delete('/:id', verifyToken, restrictTo(['admin']), userController.deleteUser); // Admin-only access

module.exports = router;
