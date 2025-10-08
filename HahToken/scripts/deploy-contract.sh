#!/bin/bash

# Deploy Smart Contract to Polygon
# This script helps deploy the Solidity smart contract

echo "🚀 Deploying FertilityToken Smart Contract"
echo "==========================================="

cd blockchain

# Check if dependencies are installed
if [ ! -d node_modules ]; then
    echo "Installing dependencies..."
    npm install
fi

echo ""
echo "Select network:"
echo "1) Local (Hardhat)"
echo "2) Polygon Mumbai Testnet"
echo "3) Polygon Mainnet"
read -p "Enter choice (1-3): " network

case $network in
    1)
        echo ""
        echo "Deploying to local Hardhat network..."
        npx hardhat run scripts/deploy.js --network hardhat
        ;;
    2)
        echo ""
        echo "Deploying to Polygon Mumbai Testnet..."
        echo "⚠️  Make sure you have:"
        echo "1. MATIC tokens in your wallet for gas fees"
        echo "2. Get test MATIC from: https://faucet.polygon.technology/"
        echo "3. PRIVATE_KEY set in .env file"
        echo ""
        read -p "Continue? (y/n): " confirm
        
        if [ "$confirm" = "y" ]; then
            npx hardhat run scripts/deploy.js --network polygonMumbai
            echo ""
            echo "✅ Contract deployed to Mumbai testnet!"
            echo ""
            echo "📝 Save the contract address to:"
            echo "- backend/.env (CONTRACT_ADDRESS)"
            echo "- frontend-web/src/environments/environment.ts (contractAddress)"
            echo "- mobile-app/app.json (extra.contractAddress)"
        fi
        ;;
    3)
        echo ""
        echo "Deploying to Polygon Mainnet..."
        echo "⚠️  WARNING: This will deploy to MAINNET!"
        echo "Make sure you have real MATIC tokens for gas fees"
        echo ""
        read -p "Are you sure? Type 'deploy-mainnet' to continue: " confirm
        
        if [ "$confirm" = "deploy-mainnet" ]; then
            npx hardhat run scripts/deploy.js --network polygon
            echo ""
            echo "✅ Contract deployed to Polygon mainnet!"
            echo ""
            echo "📝 Save the contract address to all configuration files"
        else
            echo "Deployment cancelled"
        fi
        ;;
    *)
        echo "Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "🔍 Next steps:"
echo "1. Verify the contract on PolygonScan"
echo "2. Update contract address in all config files"
echo "3. Test the contract functions"
echo ""

cd ..

