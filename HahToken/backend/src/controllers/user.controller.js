const User = require('../models/User.model');
const Story = require('../models/Story.model');

// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('stories');

    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Server error fetching profile' });
  }
};

// @desc    Get user tokens info
// @route   GET /api/user/tokens
// @access  Private
exports.getUserTokens = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('tokensReceived walletAddress');

    res.json({
      success: true,
      tokensReceived: user.tokensReceived,
      walletAddress: user.walletAddress
    });
  } catch (error) {
    console.error('Get user tokens error:', error);
    res.status(500).json({ error: 'Server error fetching token information' });
  }
};

// @desc    Update user profile
// @route   PUT /api/user/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const { name, language, walletAddress } = req.body;

    const updateFields = {};
    if (name) updateFields.name = name;
    if (language) updateFields.language = language;
    if (walletAddress) updateFields.walletAddress = walletAddress;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateFields,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Server error updating profile' });
  }
};

