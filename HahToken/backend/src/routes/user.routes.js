const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');

// Routes
router.get('/profile', protect, userController.getProfile);
router.get('/tokens', protect, userController.getUserTokens);
router.put('/profile', protect, userController.updateProfile);

module.exports = router;

