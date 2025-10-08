# FertilityToken Frontend (Angular)

Modern web application for the FertilityToken platform built with Angular 17, featuring Web3 integration and PWA support.

## Features

- 🎨 Modern, responsive UI with custom styling
- 🔐 JWT Authentication
- 🌐 Multi-language support (English & Spanish)
- 🪙 Web3/MetaMask integration for token claiming
- 📱 Progressive Web App (PWA)
- 📖 Story sharing platform
- 📊 User dashboard
- ⚡ Fast and optimized

## Prerequisites

- Node.js 18+
- npm or yarn
- Angular CLI 17+

## Installation

```bash
# Install dependencies
npm install

# Install Angular CLI globally (if not installed)
npm install -g @angular/cli
```

## Configuration

Update environment files with your configuration:

### src/environments/environment.ts (Development)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api',
  polygonRpcUrl: 'https://rpc-mumbai.maticvigil.com',
  polygonChainId: 80001,
  contractAddress: 'YOUR_CONTRACT_ADDRESS'
};
```

### src/environments/environment.prod.ts (Production)
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-api-domain.com/api',
  polygonRpcUrl: 'https://polygon-rpc.com',
  polygonChainId: 137,
  contractAddress: 'YOUR_CONTRACT_ADDRESS'
};
```

## Development

```bash
# Start development server
npm start

# or
ng serve

# Application will be available at http://localhost:4200
```

## Building

```bash
# Build for production
npm run build

# Build output will be in dist/ directory
```

## Testing

```bash
# Run unit tests
npm test

# Run linter
npm run lint
```

## Docker

```bash
# Build Docker image
docker build -t fertilitytoken-frontend .

# Run container
docker run -p 80:80 fertilitytoken-frontend
```

## Deployment

### Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to configure your deployment

### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy the contents of `dist/fertilitytoken-frontend/browser` to your web server

## Project Structure

```
src/
├── app/
│   ├── components/     # Reusable components
│   ├── pages/          # Page components
│   ├── services/       # Angular services
│   ├── guards/         # Route guards
│   ├── interceptors/   # HTTP interceptors
│   └── app.routes.ts   # Application routes
├── assets/             # Static assets
├── environments/       # Environment configurations
├── styles.css          # Global styles
└── index.html          # HTML entry point
```

## Features Guide

### Authentication
- JWT-based authentication
- Automatic token refresh
- Protected routes with auth guard

### Web3 Integration
- MetaMask connection
- Polygon Mumbai testnet support
- Token claiming functionality
- Transaction tracking

### PWA Features
- Offline support
- App installation
- Service worker caching

### Multi-language
- English and Spanish support
- Auto-detection of browser language
- Easy language switching

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT

