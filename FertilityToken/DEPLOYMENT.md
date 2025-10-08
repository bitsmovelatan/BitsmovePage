# 🚀 Deployment Guide - FertilityToken

Comprehensive deployment guide for all components of the FertilityToken platform.

## 📋 Pre-deployment Checklist

- [ ] All environment variables configured
- [ ] Smart contract deployed to desired network
- [ ] MongoDB database set up (production)
- [ ] Domain names configured (if applicable)
- [ ] SSL certificates obtained
- [ ] API keys and secrets secured
- [ ] Testing completed

## 🔗 Smart Contract Deployment

### Polygon Mumbai Testnet (Recommended for testing)

1. **Get test MATIC tokens**
   - Visit https://faucet.polygon.technology/
   - Enter your wallet address
   - Receive test MATIC

2. **Configure environment**
   ```bash
   cd blockchain
   cp .env.example .env
   # Edit .env with your PRIVATE_KEY and POLYGONSCAN_API_KEY
   ```

3. **Deploy contract**
   ```bash
   npm run deploy:mumbai
   ```

4. **Save contract address**
   - Copy the deployed contract address
   - Update in all configuration files:
     - `backend/.env` → CONTRACT_ADDRESS
     - `frontend-web/src/environments/environment.ts` → contractAddress
     - `mobile-app/app.json` → extra.contractAddress

5. **Verify contract (optional)**
   ```bash
   npx hardhat verify --network polygonMumbai CONTRACT_ADDRESS
   ```

### Polygon Mainnet (Production)

1. **Get real MATIC tokens**
   - Purchase MATIC from exchange
   - Transfer to deployment wallet

2. **Deploy to mainnet**
   ```bash
   npm run deploy:polygon
   ```

3. **Verify and update configs**

## 🖥️ Backend Deployment

### Option 1: Railway

1. **Install Railway CLI**
   ```bash
   npm install -g railway
   ```

2. **Login and initialize**
   ```bash
   railway login
   cd backend
   railway init
   ```

3. **Add MongoDB**
   ```bash
   railway add
   # Select MongoDB
   ```

4. **Set environment variables**
   ```bash
   railway variables set NODE_ENV=production
   railway variables set JWT_SECRET=your_secret_here
   railway variables set POLYGON_RPC_URL=https://rpc-mumbai.maticvigil.com
   railway variables set PRIVATE_KEY=your_private_key
   railway variables set CONTRACT_ADDRESS=your_contract_address
   ```

5. **Deploy**
   ```bash
   railway up
   ```

6. **Get deployment URL**
   ```bash
   railway domain
   ```

### Option 2: Render

1. **Create account** at https://render.com

2. **Create new Web Service**
   - Connect GitHub repository
   - Set root directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Add MongoDB**
   - Create MongoDB instance in Render
   - Or use MongoDB Atlas

4. **Set environment variables** in Render dashboard:
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_secret
   POLYGON_RPC_URL=https://rpc-mumbai.maticvigil.com
   PRIVATE_KEY=your_private_key
   CONTRACT_ADDRESS=your_contract_address
   CORS_ORIGIN=your_frontend_url
   ```

5. **Deploy** - Render auto-deploys on git push

### Option 3: Heroku

1. **Install Heroku CLI**
   ```bash
   brew install heroku/brew/heroku
   ```

2. **Login and create app**
   ```bash
   heroku login
   heroku create fertilitytoken-api
   ```

3. **Add MongoDB**
   ```bash
   heroku addons:create mongolab
   ```

4. **Set config vars**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET=your_secret
   # ... set other variables
   ```

5. **Deploy**
   ```bash
   git subtree push --prefix backend heroku main
   ```

## 🌐 Frontend Web Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Configure production environment**
   Edit `frontend-web/src/environments/environment.prod.ts`:
   ```typescript
   export const environment = {
     production: true,
     apiUrl: 'https://your-api-domain.com/api',
     polygonRpcUrl: 'https://polygon-rpc.com',
     polygonChainId: 137,
     contractAddress: 'YOUR_CONTRACT_ADDRESS'
   };
   ```

3. **Build and deploy**
   ```bash
   cd frontend-web
   npm run build
   vercel --prod
   ```

4. **Configure custom domain** in Vercel dashboard

### Netlify

1. **Build the application**
   ```bash
   cd frontend-web
   npm run build
   ```

2. **Deploy to Netlify**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=dist/fertilitytoken-frontend/browser
   ```

### Docker

1. **Build image**
   ```bash
   cd frontend-web
   docker build -t fertilitytoken-frontend .
   ```

2. **Run container**
   ```bash
   docker run -p 80:80 fertilitytoken-frontend
   ```

## 📱 Mobile App Deployment

### Expo Publish (OTA Updates)

1. **Configure app.json**
   ```json
   {
     "expo": {
       "extra": {
         "apiUrl": "https://your-api-domain.com/api",
         "contractAddress": "YOUR_CONTRACT_ADDRESS"
       }
     }
   }
   ```

2. **Publish**
   ```bash
   cd mobile-app
   expo publish
   ```

### Build Standalone Apps

#### Using EAS Build (Recommended)

1. **Install EAS CLI**
   ```bash
   npm install -g eas-cli
   ```

2. **Configure EAS**
   ```bash
   eas build:configure
   ```

3. **Build for iOS**
   ```bash
   eas build --platform ios
   ```

4. **Build for Android**
   ```bash
   eas build --platform android
   ```

#### Using Classic Build

**iOS**
```bash
expo build:ios
```

**Android APK**
```bash
expo build:android -t apk
```

**Android App Bundle**
```bash
expo build:android -t app-bundle
```

### Submit to App Stores

**iOS App Store**
```bash
eas submit --platform ios
```

**Google Play Store**
```bash
eas submit --platform android
```

## 🐳 Docker Deployment

### Full Stack with Docker Compose

1. **Configure environment variables**
   - Update `backend/.env`
   - Update frontend and mobile configurations

2. **Build and start**
   ```bash
   docker-compose up -d
   ```

3. **View logs**
   ```bash
   docker-compose logs -f
   ```

4. **Stop services**
   ```bash
   docker-compose down
   ```

### Production Docker Compose

For production, use separate docker-compose file:

```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  backend:
    image: your-registry/fertilitytoken-backend:latest
    environment:
      NODE_ENV: production
    # ... other configs
```

Deploy:
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 🔒 Security Checklist

- [ ] All secrets stored in environment variables
- [ ] JWT_SECRET is strong and random
- [ ] Private keys are secure
- [ ] CORS configured for production domains
- [ ] Rate limiting enabled
- [ ] SSL/TLS certificates configured
- [ ] Database credentials secured
- [ ] API keys not exposed in client code
- [ ] Smart contract verified on block explorer
- [ ] Security headers configured (Helmet.js)

## 📊 Post-Deployment

### Monitoring

1. **Set up monitoring**
   - Backend: Use Railway/Render/Heroku metrics
   - Frontend: Vercel Analytics
   - Errors: Sentry or similar

2. **Smart Contract monitoring**
   - Use Polygonscan API
   - Set up event listeners
   - Monitor gas usage

### Testing

1. **Test all endpoints**
   ```bash
   curl https://your-api.com/health
   ```

2. **Test frontend**
   - Visit production URL
   - Test all features
   - Check Web3 connection

3. **Test mobile app**
   - Download from Expo
   - Test on real devices
   - Verify API connections

### Backup

1. **Database backups**
   - Set up automated MongoDB backups
   - Test restore procedures

2. **Code backups**
   - Ensure git repository is backed up
   - Tag releases

## 🆘 Troubleshooting

### Backend Issues

**MongoDB connection failed**
```bash
# Check connection string
# Verify network access in MongoDB Atlas
# Check firewall rules
```

**API not responding**
```bash
# Check logs
railway logs
# or
heroku logs --tail
```

### Frontend Issues

**API calls failing**
- Verify API URL in environment config
- Check CORS settings in backend
- Verify SSL certificates

**Build failures**
```bash
# Clear cache
rm -rf node_modules dist
npm install
npm run build
```

### Mobile App Issues

**Expo publish failed**
```bash
# Clear cache
expo start -c
```

**Can't connect to API**
- Use computer IP instead of localhost
- Check firewall settings
- Verify network configuration

## 📞 Support

For deployment issues:
- Email: support@fertilitytoken.org
- Discord: [Join our community]
- GitHub Issues: [Repository URL]

## 🔄 CI/CD Setup

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        run: |
          npm install -g railway
          railway up
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        run: |
          npm install -g vercel
          cd frontend-web
          vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

---

📝 **Note**: Always test deployments in staging environment before production!

