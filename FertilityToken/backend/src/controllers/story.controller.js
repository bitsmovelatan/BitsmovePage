const { validationResult } = require('express-validator');
const Story = require('../models/Story.model');
const User = require('../models/User.model');

// @desc    Create new story
// @route   POST /api/stories
// @access  Private
exports.createStory = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, isAnonymous, language } = req.body;

    const story = await Story.create({
      title,
      content,
      author: req.user._id,
      authorName: isAnonymous ? 'Anonymous' : req.user.name,
      isAnonymous: isAnonymous || false,
      language: language || req.user.language || 'en'
    });

    // Add story to user's stories array
    await User.findByIdAndUpdate(req.user._id, {
      $push: { stories: story._id }
    });

    res.status(201).json({
      success: true,
      story
    });
  } catch (error) {
    console.error('Create story error:', error);
    res.status(500).json({ error: 'Server error creating story' });
  }
};

// @desc    Get all stories
// @route   GET /api/stories
// @access  Public
exports.getStories = async (req, res) => {
  try {
    const { language, limit = 50, page = 1 } = req.query;
    
    const query = { status: 'approved' };
    if (language) {
      query.language = language;
    }

    const stories = await Story.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .select('-__v');

    const total = await Story.countDocuments(query);

    res.json({
      success: true,
      count: stories.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      stories
    });
  } catch (error) {
    console.error('Get stories error:', error);
    res.status(500).json({ error: 'Server error fetching stories' });
  }
};

// @desc    Get single story
// @route   GET /api/stories/:id
// @access  Public
exports.getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }

    res.json({
      success: true,
      story
    });
  } catch (error) {
    console.error('Get story error:', error);
    res.status(500).json({ error: 'Server error fetching story' });
  }
};

// @desc    Like a story
// @route   PUT /api/stories/:id/like
// @access  Public
exports.likeStory = async (req, res) => {
  try {
    const story = await Story.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }

    res.json({
      success: true,
      likes: story.likes
    });
  } catch (error) {
    console.error('Like story error:', error);
    res.status(500).json({ error: 'Server error liking story' });
  }
};

// @desc    Delete story
// @route   DELETE /api/stories/:id
// @access  Private (own stories only)
exports.deleteStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }

    // Check if user is the author
    if (story.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to delete this story' });
    }

    await story.deleteOne();

    // Remove story from user's stories array
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { stories: story._id }
    });

    res.json({
      success: true,
      message: 'Story deleted successfully'
    });
  } catch (error) {
    console.error('Delete story error:', error);
    res.status(500).json({ error: 'Server error deleting story' });
  }
};

