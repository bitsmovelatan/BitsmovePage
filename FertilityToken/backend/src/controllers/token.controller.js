const { validationResult } = require('express-validator');
const { ethers } = require('ethers');
const User = require('../models/User.model');

// Initialize provider and wallet
let provider, wallet, contract;

try {
  provider = new ethers.JsonRpcProvider(process.env.POLYGON_RPC_URL);
  
  if (process.env.PRIVATE_KEY) {
    wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  }

  // Contract ABI (simplified - will be replaced with actual ABI)
  const contractABI = [
    "function mint(address to, uint256 amount) public",
    "function balanceOf(address account) public view returns (uint256)",
    "function decimals() public view returns (uint8)"
  ];

  if (process.env.CONTRACT_ADDRESS && wallet) {
    contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractABI, wallet);
  }
} catch (error) {
  console.warn('⚠️  Blockchain initialization warning:', error.message);
  console.warn('⚠️  Token claiming will not work until blockchain is properly configured');
}

// @desc    Claim tokens
// @route   POST /api/token/claim
// @access  Private
exports.claimToken = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!contract) {
      return res.status(503).json({ 
        error: 'Blockchain service not configured. Please set up contract address and private key.' 
      });
    }

    const { walletAddress } = req.body;

    // Check if user already claimed
    if (req.user.tokensReceived > 0) {
      return res.status(400).json({ 
        error: 'You have already claimed your tokens' 
      });
    }

    // Amount to mint (1000 tokens with 18 decimals)
    const amount = ethers.parseUnits('1000', 18);

    // Mint tokens
    const tx = await contract.mint(walletAddress, amount);
    await tx.wait();

    // Update user record
    await User.findByIdAndUpdate(req.user._id, {
      walletAddress: walletAddress,
      tokensReceived: 1000
    });

    res.json({
      success: true,
      message: 'Tokens claimed successfully',
      amount: '1000',
      transactionHash: tx.hash,
      walletAddress
    });
  } catch (error) {
    console.error('Claim token error:', error);
    
    if (error.message.includes('already claimed')) {
      return res.status(400).json({ error: 'Tokens already claimed' });
    }
    
    res.status(500).json({ 
      error: 'Server error claiming tokens',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get token balance
// @route   GET /api/token/balance/:walletAddress
// @access  Public
exports.getBalance = async (req, res) => {
  try {
    if (!contract) {
      return res.status(503).json({ 
        error: 'Blockchain service not configured' 
      });
    }

    const { walletAddress } = req.params;

    const balance = await contract.balanceOf(walletAddress);
    const decimals = await contract.decimals();
    const formattedBalance = ethers.formatUnits(balance, decimals);

    res.json({
      success: true,
      walletAddress,
      balance: formattedBalance,
      balanceRaw: balance.toString()
    });
  } catch (error) {
    console.error('Get balance error:', error);
    res.status(500).json({ error: 'Server error fetching balance' });
  }
};

