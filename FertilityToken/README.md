# 🌸 FertilityToken Platform

A comprehensive blockchain-based token platform with community engagement, storytelling, and tokenized incentives.

## 📋 Overview

FertilityToken combines modern web technologies with blockchain to create an engaging ecosystem where users can:
- 📖 Share and read community stories
- 🪙 Receive FERT tokens for participation
- 🌍 Connect with others globally in multiple languages
- 🔒 Benefit from transparent, secure blockchain transactions

## 🏗️ Architecture

The platform consists of four main components:

1. **Backend API** (Node.js + Express + MongoDB)
2. **Frontend Web** (Angular 17 + Web3)
3. **Mobile App** (React Native + Expo)
4. **Smart Contract** (Solidity + Hardhat on Polygon)

```
┌─────────────────┐     ┌─────────────────┐
│  Angular Web    │────▶│   Node.js API   │
└─────────────────┘     └─────────────────┘
                               │
┌─────────────────┐            │
│  React Native   │────────────┤
│   Mobile App    │            │
└─────────────────┘            ▼
                        ┌─────────────┐
┌─────────────────┐    │   MongoDB   │
│ Smart Contract  │    └─────────────┘
│  (Polygon)      │
└─────────────────┘
```

## ✨ Features

### Core Features
- 🔐 **JWT Authentication** - Secure user authentication
- 📖 **Story Platform** - Share and read community stories
- 🪙 **Token Claiming** - One-time claim of 1,000 FERT tokens
- 🌐 **Multi-language** - English and Spanish support
- 📱 **Cross-platform** - Web, iOS, and Android
- 💼 **User Dashboard** - Track tokens and manage profile

### Technical Features
- RESTful API with comprehensive endpoints
- Web3 wallet integration (MetaMask/WalletConnect)
- PWA support for offline capability
- Docker containerization
- Smart contract with pausable functionality
- Rate limiting and security headers
- Responsive UI with modern design

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MongoDB 5+
- npm or yarn
- Docker (optional)
- MetaMask wallet (for blockchain features)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/FertilityToken.git
cd FertilityToken
```

2. **Run setup script**
```bash
chmod +x scripts/setup-project.sh
./scripts/setup-project.sh
```

3. **Configure environment variables**

Update the following files with your configuration:
- `backend/.env`
- `frontend-web/src/environments/environment.ts`
- `mobile-app/app.json`

4. **Start MongoDB**
```bash
mongod
```

5. **Deploy smart contract** (Optional - required for token claiming)
```bash
cd blockchain
npm run deploy:mumbai
# Save the contract address to config files
```

6. **Start all services**

Option A - Using the start script:
```bash
chmod +x scripts/start-dev.sh
./scripts/start-dev.sh
```

Option B - Manual start:
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend-web && npm start

# Terminal 3 - Mobile
cd mobile-app && npm start
```

Option C - Using Docker Compose:
```bash
docker-compose up -d
```

### Access the Applications

- **Backend API**: http://localhost:5000
- **Frontend Web**: http://localhost:4200
- **Mobile App**: Scan QR code with Expo Go
- **API Documentation**: http://localhost:5000/health

## 📦 Project Structure

```
FertilityToken/
├── backend/              # Node.js + Express API
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── models/       # Mongoose models
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Custom middleware
│   │   └── server.js     # Entry point
│   ├── Dockerfile
│   └── package.json
│
├── frontend-web/         # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── services/
│   │   │   └── guards/
│   │   └── environments/
│   ├── Dockerfile
│   └── package.json
│
├── mobile-app/           # React Native + Expo
│   ├── src/
│   │   ├── screens/      # Screen components
│   │   ├── contexts/     # React contexts
│   │   └── styles/       # Styling
│   ├── App.js
│   └── package.json
│
├── blockchain/           # Smart contracts
│   ├── contracts/        # Solidity contracts
│   ├── scripts/          # Deployment scripts
│   ├── test/            # Contract tests
│   └── hardhat.config.js
│
├── scripts/              # Utility scripts
│   ├── setup-project.sh
│   ├── start-dev.sh
│   ├── deploy-backend.sh
│   ├── deploy-frontend.sh
│   └── deploy-contract.sh
│
├── docker-compose.yml    # Docker orchestration
└── README.md            # This file
```

## 🔧 Configuration

### Backend Environment Variables

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/fertilitytoken
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
POLYGON_RPC_URL=https://rpc-mumbai.maticvigil.com
PRIVATE_KEY=your_wallet_private_key
CONTRACT_ADDRESS=deployed_contract_address
CORS_ORIGIN=http://localhost:4200,http://localhost:19006
```

### Frontend Configuration

Update `frontend-web/src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api',
  polygonRpcUrl: 'https://rpc-mumbai.maticvigil.com',
  polygonChainId: 80001,
  contractAddress: 'YOUR_CONTRACT_ADDRESS'
};
```

### Mobile Configuration

Update `mobile-app/app.json`:
```json
{
  "expo": {
    "extra": {
      "apiUrl": "http://YOUR_IP:5000/api",
      "polygonRpcUrl": "https://rpc-mumbai.maticvigil.com",
      "contractAddress": "YOUR_CONTRACT_ADDRESS"
    }
  }
}
```

## 📚 API Documentation

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Stories
- `GET /api/stories` - Get all stories
- `POST /api/stories` - Create story (authenticated)
- `GET /api/stories/:id` - Get single story
- `PUT /api/stories/:id/like` - Like a story
- `DELETE /api/stories/:id` - Delete story (authenticated)

### Tokens
- `POST /api/token/claim` - Claim tokens (authenticated)
- `GET /api/token/balance/:address` - Get token balance

### User
- `GET /api/user/profile` - Get user profile (authenticated)
- `GET /api/user/tokens` - Get user token info (authenticated)
- `PUT /api/user/profile` - Update profile (authenticated)

## 🚢 Deployment

### Backend (Node.js API)

**Option 1: Railway**
```bash
./scripts/deploy-backend.sh
# Select option 1
```

**Option 2: Render**
```bash
./scripts/deploy-backend.sh
# Select option 2
```

### Frontend (Angular)

**Vercel (Recommended)**
```bash
./scripts/deploy-frontend.sh
```

### Mobile App

**Expo**
```bash
cd mobile-app
expo publish
# Or build standalone apps
eas build --platform all
```

### Smart Contract

**Polygon Mumbai Testnet**
```bash
./scripts/deploy-contract.sh
# Select option 2
```

## 🧪 Testing

### Backend
```bash
cd backend
npm test
```

### Frontend
```bash
cd frontend-web
npm test
```

### Smart Contract
```bash
cd blockchain
npx hardhat test
```

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- CORS configuration
- Helmet security headers
- Input validation
- Pausable smart contract

## 🌍 Multi-language Support

The platform supports:
- 🇬🇧 English
- 🇪🇸 Spanish

Translations are managed in:
- Frontend: `src/app/services/language.service.ts`
- Mobile: `src/contexts/LanguageContext.js`

## 📱 Browser/Device Support

### Web
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Mobile
- iOS 13+
- Android 5.0+

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Bitsmove** - Development Team

## 🙏 Acknowledgments

- OpenZeppelin for smart contract libraries
- Polygon for blockchain infrastructure
- The fertility support community

## 📞 Support

For support, email support@fertilitytoken.org or join our Discord community.

## 🗺️ Roadmap

- [ ] Mobile wallet integration (WalletConnect)
- [ ] NFT certificates for milestones
- [ ] Marketplace for fertility services
- [ ] Telemedicine integration
- [ ] Community forums
- [ ] AI-powered resources matching

---

Made with 💜 by Bitsmove

