# 🚀 Getting Started with FertilityToken

Quick start guide to get the FertilityToken platform running on your local machine.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v5 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/downloads)
- **MetaMask** (browser extension) - [Install](https://metamask.io/)

## 🎯 Quick Start (5 Minutes)

### Step 1: Clone and Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/FertilityToken.git
cd FertilityToken

# Run automated setup
chmod +x scripts/setup-project.sh
./scripts/setup-project.sh
```

This script will:
- Install all dependencies for backend, frontend, mobile, and blockchain
- Create `.env` files from examples
- Set up the project structure

### Step 2: Start MongoDB

**macOS (with Homebrew):**
```bash
brew services start mongodb-community
```

**Windows:**
```bash
net start MongoDB
```

**Linux:**
```bash
sudo systemctl start mongod
```

**Or use Docker:**
```bash
docker run -d -p 27017:27017 --name fertilitytoken-mongo mongo:7
```

### Step 3: Configure Environment

Edit `backend/.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/fertilitytoken
JWT_SECRET=fertilitytoken_secret_key_change_in_production_2024
JWT_EXPIRE=7d
```

### Step 4: Start All Services

**Option A - Automated (with tmux):**
```bash
chmod +x scripts/start-dev.sh
./scripts/start-dev.sh
```

**Option B - Manual (3 terminals):**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend-web
npm start
```

Terminal 3 - Mobile (optional):
```bash
cd mobile-app
npm start
```

### Step 5: Access the Applications

- 🌐 **Frontend Web**: http://localhost:4200
- 🔌 **Backend API**: http://localhost:5000
- 📱 **Mobile App**: Scan QR code with Expo Go app

## 📱 Testing on Mobile Device

### iOS:
1. Install [Expo Go](https://apps.apple.com/app/expo-go/id982107779) from App Store
2. Scan QR code with Camera app
3. App opens in Expo Go

### Android:
1. Install [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent) from Play Store
2. Scan QR code with Expo Go app
3. App opens automatically

**Important:** Replace `localhost` with your computer's IP address in `mobile-app/app.json`:
```json
{
  "expo": {
    "extra": {
      "apiUrl": "http://YOUR_IP_ADDRESS:5000/api"
    }
  }
}
```

Find your IP:
- macOS/Linux: `ifconfig | grep "inet "`
- Windows: `ipconfig`

## 🪙 Testing Blockchain Features (Optional)

### Step 1: Get Test MATIC

1. Create/use MetaMask wallet
2. Switch to Polygon Mumbai Testnet:
   - Network Name: Mumbai Testnet
   - RPC URL: https://rpc-mumbai.maticvigil.com
   - Chain ID: 80001
   - Currency: MATIC
3. Get free test MATIC from [Polygon Faucet](https://faucet.polygon.technology/)

### Step 2: Deploy Smart Contract

```bash
cd blockchain
npm install

# Create .env file
echo "PRIVATE_KEY=your_wallet_private_key_here" > .env
echo "POLYGON_RPC_URL=https://rpc-mumbai.maticvigil.com" >> .env

# Deploy to Mumbai testnet
npm run deploy:mumbai
```

### Step 3: Update Configuration

Copy the deployed contract address and update:

1. **Backend** (`backend/.env`):
```env
CONTRACT_ADDRESS=0xYourContractAddress
```

2. **Frontend** (`frontend-web/src/environments/environment.ts`):
```typescript
contractAddress: '0xYourContractAddress'
```

3. **Mobile** (`mobile-app/app.json`):
```json
"contractAddress": "0xYourContractAddress"
```

### Step 4: Restart Services

Restart all services to load new configuration.

## 🧪 Testing the Platform

### 1. Create an Account

1. Open http://localhost:4200
2. Click "Register"
3. Fill in:
   - Name: Test User
   - Email: test@example.com
   - Password: test123
   - Language: English
4. Click "Register"

### 2. Share a Story

1. Navigate to "Stories"
2. Click "Share Your Story"
3. Write a title and content
4. Optional: Check "Post Anonymously"
5. Click "Submit Story"

### 3. Claim Tokens (if blockchain configured)

1. Go to "Dashboard"
2. Click "Claim Tokens"
3. Connect MetaMask wallet
4. Approve transaction
5. Wait for confirmation

## 🐳 Alternative: Docker Setup

If you prefer Docker:

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

Access:
- Frontend: http://localhost
- Backend: http://localhost:5000
- Mobile Web: http://localhost:8080

## 🔧 Common Issues

### MongoDB Connection Error

**Error:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solution:**
```bash
# Check if MongoDB is running
ps aux | grep mongod

# Start MongoDB
brew services start mongodb-community  # macOS
sudo systemctl start mongod            # Linux
net start MongoDB                      # Windows
```

### Port Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Find process using port
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill process
kill -9 PID  # Replace PID with actual process ID
```

### Angular Build Failed

**Error:** Build errors or module not found

**Solution:**
```bash
cd frontend-web
rm -rf node_modules dist .angular
npm install
npm start
```

### Expo Can't Connect

**Error:** Can't connect to Metro bundler

**Solution:**
1. Ensure computer and phone are on same WiFi
2. Use IP address instead of localhost
3. Check firewall settings
4. Try: `expo start -c` (clear cache)

### Smart Contract Deployment Failed

**Error:** Insufficient funds or network error

**Solution:**
1. Ensure you have test MATIC
2. Check RPC URL is correct
3. Verify private key format (no 0x prefix in .env)
4. Check network connection

## 📚 Next Steps

Now that you have the platform running:

1. **Read the Documentation**
   - [README.md](README.md) - Full project overview
   - [DEPLOYMENT.md](DEPLOYMENT.md) - Production deployment guide
   - Each component has its own README

2. **Explore the Code**
   - Backend: `backend/src/`
   - Frontend: `frontend-web/src/app/`
   - Mobile: `mobile-app/src/`
   - Smart Contract: `blockchain/contracts/`

3. **Customize**
   - Update branding and colors
   - Add new features
   - Modify translations

4. **Deploy**
   - Follow [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment
   - Use provided scripts in `scripts/` directory

## 🆘 Need Help?

- 📧 Email: support@fertilitytoken.org
- 💬 Discord: [Join Community]
- 🐛 GitHub Issues: [Report Bug]
- 📖 Documentation: [Full Docs]

## 🎓 Tutorials

### Video Tutorials (Coming Soon)
- Platform Overview
- Local Setup Guide
- Blockchain Integration
- Deployment Walkthrough

### Written Guides
- [Smart Contract Guide](blockchain/README.md)
- [API Documentation](backend/README.md)
- [Frontend Guide](frontend-web/README.md)
- [Mobile App Guide](mobile-app/README.md)

---

Happy coding! 🌸💜

