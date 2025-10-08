#!/bin/bash

# Setup FertilityToken Project
# This script sets up all components of the project

echo "🌸 FertilityToken Project Setup"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "This script will set up all components:"
echo "1. Backend (Node.js + Express + MongoDB)"
echo "2. Frontend Web (Angular)"
echo "3. Mobile App (React Native + Expo)"
echo "4. Smart Contract (Solidity + Hardhat)"
echo ""
read -p "Continue? (y/n): " confirm

if [ "$confirm" != "y" ]; then
    echo "Setup cancelled"
    exit 0
fi

echo ""
echo "${YELLOW}📦 Installing Backend Dependencies...${NC}"
cd backend
npm install
cp .env.example .env
echo "✅ Backend setup complete"
cd ..

echo ""
echo "${YELLOW}📦 Installing Blockchain Dependencies...${NC}"
cd blockchain
npm install
echo "✅ Blockchain setup complete"
cd ..

echo ""
echo "${YELLOW}📦 Installing Frontend Web Dependencies...${NC}"
cd frontend-web
npm install
echo "✅ Frontend Web setup complete"
cd ..

echo ""
echo "${YELLOW}📦 Installing Mobile App Dependencies...${NC}"
cd mobile-app
npm install
echo "✅ Mobile App setup complete"
cd ..

echo ""
echo "${GREEN}✅ Project setup complete!${NC}"
echo ""
echo "📝 Next steps:"
echo ""
echo "1. Configure environment variables:"
echo "   - backend/.env"
echo "   - frontend-web/src/environments/environment.ts"
echo "   - mobile-app/app.json"
echo ""
echo "2. Start MongoDB (if running locally):"
echo "   mongod"
echo ""
echo "3. Deploy smart contract:"
echo "   cd blockchain && npm run deploy:mumbai"
echo ""
echo "4. Start backend:"
echo "   cd backend && npm run dev"
echo ""
echo "5. Start frontend:"
echo "   cd frontend-web && npm start"
echo ""
echo "6. Start mobile app:"
echo "   cd mobile-app && npm start"
echo ""
echo "Or use Docker Compose:"
echo "   docker-compose up -d"
echo ""

