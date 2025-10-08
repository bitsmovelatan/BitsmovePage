#!/bin/bash

# Deploy Backend to Render or Railway
# This script helps deploy the Node.js backend

echo "🚀 Deploying FertilityToken Backend"
echo "===================================="

# Check if git is initialized
if [ ! -d .git ]; then
    echo "Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit"
fi

# Prompt for deployment platform
echo ""
echo "Select deployment platform:"
echo "1) Railway"
echo "2) Render"
echo "3) Heroku"
read -p "Enter choice (1-3): " platform

case $platform in
    1)
        echo ""
        echo "Deploying to Railway..."
        echo "========================"
        echo ""
        echo "Instructions:"
        echo "1. Install Railway CLI: npm install -g railway"
        echo "2. Login: railway login"
        echo "3. Create project: railway init"
        echo "4. Add MongoDB: railway add"
        echo "5. Set environment variables in Railway dashboard"
        echo "6. Deploy: railway up"
        echo ""
        echo "Environment variables to set:"
        echo "- NODE_ENV=production"
        echo "- JWT_SECRET=your_secret"
        echo "- POLYGON_RPC_URL=https://rpc-mumbai.maticvigil.com"
        echo "- PRIVATE_KEY=your_wallet_private_key"
        echo "- CONTRACT_ADDRESS=your_contract_address"
        echo ""
        read -p "Press Enter to open Railway docs..."
        open "https://docs.railway.app/deploy/deployments"
        ;;
    2)
        echo ""
        echo "Deploying to Render..."
        echo "======================"
        echo ""
        echo "Instructions:"
        echo "1. Go to https://render.com"
        echo "2. Create new Web Service"
        echo "3. Connect your Git repository"
        echo "4. Configure:"
        echo "   - Build Command: cd backend && npm install"
        echo "   - Start Command: cd backend && npm start"
        echo "5. Add environment variables in Render dashboard"
        echo "6. Deploy"
        echo ""
        echo "Environment variables to set:"
        echo "- NODE_ENV=production"
        echo "- MONGODB_URI=your_mongodb_connection"
        echo "- JWT_SECRET=your_secret"
        echo "- POLYGON_RPC_URL=https://rpc-mumbai.maticvigil.com"
        echo "- PRIVATE_KEY=your_wallet_private_key"
        echo "- CONTRACT_ADDRESS=your_contract_address"
        echo ""
        read -p "Press Enter to open Render..."
        open "https://render.com"
        ;;
    3)
        echo ""
        echo "Deploying to Heroku..."
        echo "======================"
        echo ""
        echo "Instructions:"
        echo "1. Install Heroku CLI: brew install heroku/brew/heroku"
        echo "2. Login: heroku login"
        echo "3. Create app: heroku create fertilitytoken-api"
        echo "4. Add MongoDB: heroku addons:create mongolab"
        echo "5. Set environment variables:"
        heroku config:set NODE_ENV=production
        echo "6. Deploy: git subtree push --prefix backend heroku main"
        echo ""
        ;;
    *)
        echo "Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "✅ Deployment guide complete!"

