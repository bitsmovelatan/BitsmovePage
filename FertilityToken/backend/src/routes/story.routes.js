const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const storyController = require('../controllers/story.controller');
const { protect } = require('../middleware/auth.middleware');

// Validation middleware
const storyValidation = [
  body('title').trim().notEmpty().withMessage('Title is required')
    .isLength({ max: 200 }).withMessage('Title cannot exceed 200 characters'),
  body('content').trim().notEmpty().withMessage('Content is required')
    .isLength({ max: 5000 }).withMessage('Content cannot exceed 5000 characters')
];

// Routes
router.post('/', protect, storyValidation, storyController.createStory);
router.get('/', storyController.getStories);
router.get('/:id', storyController.getStoryById);
router.put('/:id/like', storyController.likeStory);
router.delete('/:id', protect, storyController.deleteStory);

module.exports = router;

