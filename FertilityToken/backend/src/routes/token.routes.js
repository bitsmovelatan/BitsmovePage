const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const tokenController = require('../controllers/token.controller');
const { protect } = require('../middleware/auth.middleware');

// Validation middleware
const claimValidation = [
  body('walletAddress').trim().notEmpty().withMessage('Wallet address is required')
    .matches(/^0x[a-fA-F0-9]{40}$/).withMessage('Invalid wallet address format')
];

// Routes
router.post('/claim', protect, claimValidation, tokenController.claimToken);
router.get('/balance/:walletAddress', tokenController.getBalance);

module.exports = router;

