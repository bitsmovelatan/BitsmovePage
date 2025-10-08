# FertilityToken Smart Contract

ERC20 token smart contract for the FertilityToken platform deployed on Polygon.

## Features

- 🪙 ERC20 standard token
- 🎁 One-time token claiming (1000 FERT per user)
- 👑 Owner minting capabilities
- ⏸️ Pausable functionality
- 🔒 Built with OpenZeppelin contracts

## Prerequisites

- Node.js 16+
- Hardhat
- Polygon Mumbai testnet wallet with MATIC

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file:

```env
PRIVATE_KEY=your_private_key_here
POLYGON_RPC_URL=https://rpc-mumbai.maticvigil.com
POLYGONSCAN_API_KEY=your_polygonscan_api_key
```

## Compilation

```bash
npm run compile
```

## Testing

```bash
npm test
```

## Deployment

### Local (Hardhat Network)
```bash
npm run deploy:local
```

### Polygon Mumbai Testnet
```bash
npm run deploy:mumbai
```

### Polygon Mainnet
```bash
npm run deploy:polygon
```

## Contract Details

- **Name**: FertilityToken
- **Symbol**: FERT
- **Decimals**: 18
- **Initial Supply**: 1,000,000 FERT
- **Claim Amount**: 1,000 FERT per user

## Functions

### Public Functions
- `claimTokens()` - Claim 1000 FERT tokens (one time only)
- `hasClaimedTokens(address)` - Check if address has claimed

### Owner Functions
- `mint(address, uint256)` - Mint tokens to address
- `mintAndMarkClaimed(address, uint256)` - Mint and mark as claimed
- `pause()` - Pause all token transfers
- `unpause()` - Unpause token transfers

## Verification

After deployment, verify the contract on Polygonscan:

```bash
npx hardhat verify --network polygonMumbai DEPLOYED_CONTRACT_ADDRESS
```

## Security

- Uses OpenZeppelin audited contracts
- Pausable for emergency stops
- Ownable for access control
- One-time claim mechanism to prevent abuse

## License

MIT

