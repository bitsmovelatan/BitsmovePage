// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title HahToken
 * @dev ERC20 Token for the Hah platform
 */
contract HahToken is ERC20, Ownable, Pausable {
    
    // Token details
    uint256 public constant INITIAL_SUPPLY = 1000000 * 10**18; // 1 million tokens
    uint256 public constant CLAIM_AMOUNT = 1000 * 10**18; // 1000 tokens per claim
    
    // Mapping to track claims
    mapping(address => bool) public hasClaimed;
    
    // Events
    event TokensClaimed(address indexed recipient, uint256 amount);
    event TokensMinted(address indexed to, uint256 amount);
    
    constructor() ERC20("HahToken", "HAH") Ownable(msg.sender) {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
    
    /**
     * @dev Allows users to claim tokens (one time only)
     */
    function claimTokens() external whenNotPaused {
        require(!hasClaimed[msg.sender], "Tokens already claimed");
        
        hasClaimed[msg.sender] = true;
        _mint(msg.sender, CLAIM_AMOUNT);
        
        emit TokensClaimed(msg.sender, CLAIM_AMOUNT);
    }
    
    /**
     * @dev Admin function to mint tokens to specific address
     * @param to Address to receive tokens
     * @param amount Amount of tokens to mint
     */
    function mint(address to, uint256 amount) external onlyOwner {
        require(to != address(0), "Cannot mint to zero address");
        _mint(to, amount);
        emit TokensMinted(to, amount);
    }
    
    /**
     * @dev Admin function to mint tokens and mark as claimed
     * @param to Address to receive tokens
     * @param amount Amount of tokens to mint
     */
    function mintAndMarkClaimed(address to, uint256 amount) external onlyOwner {
        require(to != address(0), "Cannot mint to zero address");
        require(!hasClaimed[to], "Already marked as claimed");
        
        hasClaimed[to] = true;
        _mint(to, amount);
        
        emit TokensClaimed(to, amount);
        emit TokensMinted(to, amount);
    }
    
    /**
     * @dev Check if an address has claimed tokens
     * @param account Address to check
     */
    function hasClaimedTokens(address account) external view returns (bool) {
        return hasClaimed[account];
    }
    
    /**
     * @dev Pause token transfers
     */
    function pause() external onlyOwner {
        _pause();
    }
    
    /**
     * @dev Unpause token transfers
     */
    function unpause() external onlyOwner {
        _unpause();
    }
    
    /**
     * @dev Override transfer function to add pause functionality
     */
    function _update(address from, address to, uint256 value) internal virtual override whenNotPaused {
        super._update(from, to, value);
    }
}

