# FertilityToken Backend API

Backend API for the FertilityToken platform built with Node.js, Express, and MongoDB.

## Features

- 🔐 JWT Authentication
- 📖 Story management system
- 🪙 Token claiming with blockchain integration
- 🛡️ Security with Helmet, CORS, and rate limiting
- 🌍 Multi-language support (English & Spanish)
- 📊 MongoDB with Mongoose ODM

## Prerequisites

- Node.js 18+
- MongoDB 5+
- Polygon Mumbai testnet wallet (for blockchain features)

## Installation

```bash
# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your configurations
```

## Environment Variables

See `.env.example` for all required environment variables.

Key variables:
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `POLYGON_RPC_URL`: Polygon RPC endpoint
- `PRIVATE_KEY`: Wallet private key for blockchain operations
- `CONTRACT_ADDRESS`: Deployed smart contract address

## Running the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Stories
- `POST /api/stories` - Create story (protected)
- `GET /api/stories` - Get all stories
- `GET /api/stories/:id` - Get single story
- `PUT /api/stories/:id/like` - Like a story
- `DELETE /api/stories/:id` - Delete story (protected)

### Tokens
- `POST /api/token/claim` - Claim tokens (protected)
- `GET /api/token/balance/:walletAddress` - Get token balance

### User
- `GET /api/user/profile` - Get user profile (protected)
- `GET /api/user/tokens` - Get user tokens info (protected)
- `PUT /api/user/profile` - Update profile (protected)

## Docker

```bash
# Build image
docker build -t fertilitytoken-backend .

# Run container
docker run -p 5000:5000 --env-file .env fertilitytoken-backend
```

## Testing

```bash
npm test
```

## Security

- Helmet for security headers
- CORS configured for specific origins
- Rate limiting on all API routes
- JWT token-based authentication
- Password hashing with bcrypt

## License

MIT

