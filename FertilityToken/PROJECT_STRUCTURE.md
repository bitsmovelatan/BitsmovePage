# 📁 Project Structure - FertilityToken

Detailed breakdown of the project directory structure and file organization.

## 🌳 Directory Tree

```
FertilityToken/
│
├── 📂 backend/                      # Node.js Backend API
│   ├── src/
│   │   ├── controllers/             # Request handlers
│   │   │   ├── auth.controller.js   # Authentication logic
│   │   │   ├── story.controller.js  # Story management
│   │   │   ├── token.controller.js  # Token claiming
│   │   │   └── user.controller.js   # User management
│   │   ├── models/                  # MongoDB schemas
│   │   │   ├── User.model.js        # User schema
│   │   │   └── Story.model.js       # Story schema
│   │   ├── routes/                  # API routes
│   │   │   ├── auth.routes.js       # Auth endpoints
│   │   │   ├── story.routes.js      # Story endpoints
│   │   │   ├── token.routes.js      # Token endpoints
│   │   │   └── user.routes.js       # User endpoints
│   │   ├── middleware/              # Custom middleware
│   │   │   ├── auth.middleware.js   # JWT verification
│   │   │   └── errorHandler.js      # Error handling
│   │   └── server.js                # App entry point
│   ├── .env                         # Environment variables
│   ├── .env.example                 # Environment template
│   ├── package.json                 # Dependencies
│   ├── Dockerfile                   # Docker configuration
│   ├── .dockerignore               # Docker ignore rules
│   └── README.md                    # Backend documentation
│
├── 📂 frontend-web/                 # Angular Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/          # Reusable components
│   │   │   │   ├── navbar/
│   │   │   │   │   └── navbar.component.ts
│   │   │   │   └── footer/
│   │   │   │       └── footer.component.ts
│   │   │   ├── pages/               # Page components
│   │   │   │   ├── home/
│   │   │   │   │   └── home.component.ts
│   │   │   │   ├── login/
│   │   │   │   │   └── login.component.ts
│   │   │   │   ├── register/
│   │   │   │   │   └── register.component.ts
│   │   │   │   ├── stories/
│   │   │   │   │   └── stories.component.ts
│   │   │   │   ├── dashboard/
│   │   │   │   │   └── dashboard.component.ts
│   │   │   │   └── claim-tokens/
│   │   │   │       └── claim-tokens.component.ts
│   │   │   ├── services/            # Angular services
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── language.service.ts
│   │   │   │   ├── story.service.ts
│   │   │   │   └── web3.service.ts
│   │   │   ├── guards/              # Route guards
│   │   │   │   └── auth.guard.ts
│   │   │   ├── interceptors/        # HTTP interceptors
│   │   │   │   └── auth.interceptor.ts
│   │   │   ├── app.component.ts     # Root component
│   │   │   └── app.routes.ts        # Routing config
│   │   ├── assets/                  # Static assets
│   │   ├── environments/            # Environment configs
│   │   │   ├── environment.ts       # Development
│   │   │   └── environment.prod.ts  # Production
│   │   ├── styles.css               # Global styles
│   │   ├── index.html               # HTML entry
│   │   ├── main.ts                  # App bootstrap
│   │   ├── manifest.json            # PWA manifest
│   │   └── ngsw-config.json         # Service worker config
│   ├── angular.json                 # Angular CLI config
│   ├── tsconfig.json                # TypeScript config
│   ├── package.json                 # Dependencies
│   ├── Dockerfile                   # Docker configuration
│   ├── nginx.conf                   # Nginx config for Docker
│   └── README.md                    # Frontend documentation
│
├── 📂 mobile-app/                   # React Native Mobile
│   ├── src/
│   │   ├── screens/                 # Screen components
│   │   │   ├── HomeScreen.js
│   │   │   ├── LoginScreen.js
│   │   │   ├── RegisterScreen.js
│   │   │   ├── StoriesScreen.js
│   │   │   ├── DashboardScreen.js
│   │   │   └── ClaimTokensScreen.js
│   │   ├── contexts/                # React contexts
│   │   │   ├── AuthContext.js
│   │   │   └── LanguageContext.js
│   │   └── styles/                  # Styling
│   │       └── globalStyles.js
│   ├── assets/                      # Images, fonts
│   ├── App.js                       # Main app component
│   ├── app.json                     # Expo configuration
│   ├── babel.config.js              # Babel config
│   ├── package.json                 # Dependencies
│   ├── Dockerfile                   # Docker (web build)
│   ├── nginx.conf                   # Nginx for web
│   └── README.md                    # Mobile documentation
│
├── 📂 blockchain/                   # Smart Contracts
│   ├── contracts/                   # Solidity contracts
│   │   └── FertilityToken.sol      # Main ERC20 contract
│   ├── scripts/                     # Deployment scripts
│   │   └── deploy.js                # Deployment logic
│   ├── test/                        # Contract tests
│   │   └── FertilityToken.test.js  # Test suite
│   ├── hardhat.config.js            # Hardhat configuration
│   ├── package.json                 # Dependencies
│   └── README.md                    # Blockchain documentation
│
├── 📂 scripts/                      # Utility scripts
│   ├── setup-project.sh             # Initial setup
│   ├── start-dev.sh                 # Start dev environment
│   ├── deploy-backend.sh            # Deploy backend
│   ├── deploy-frontend.sh           # Deploy frontend
│   └── deploy-contract.sh           # Deploy smart contract
│
├── 📄 docker-compose.yml            # Docker orchestration
├── 📄 .dockerignore                # Docker ignore rules
├── 📄 .gitignore                   # Git ignore rules
├── 📄 README.md                     # Main documentation
├── 📄 GETTING_STARTED.md           # Quick start guide
├── 📄 DEPLOYMENT.md                # Deployment guide
├── 📄 PROJECT_STRUCTURE.md         # This file
└── 📄 LICENSE                       # MIT License
```

## 📝 File Descriptions

### Root Level Files

| File | Purpose |
|------|---------|
| `docker-compose.yml` | Orchestrates all services (MongoDB, Backend, Frontend) |
| `.dockerignore` | Files to exclude from Docker builds |
| `.gitignore` | Files to exclude from Git |
| `README.md` | Main project documentation and overview |
| `GETTING_STARTED.md` | Quick start guide for developers |
| `DEPLOYMENT.md` | Production deployment instructions |
| `LICENSE` | MIT License for the project |

### Backend Structure

#### Controllers (`backend/src/controllers/`)
Business logic and request handling for each feature:
- **auth.controller.js**: User registration and login
- **story.controller.js**: CRUD operations for stories
- **token.controller.js**: Token claiming and balance queries
- **user.controller.js**: User profile management

#### Models (`backend/src/models/`)
MongoDB schemas using Mongoose:
- **User.model.js**: User data structure (email, password, tokens, etc.)
- **Story.model.js**: Story data structure (title, content, author, etc.)

#### Routes (`backend/src/routes/`)
Express route definitions:
- **auth.routes.js**: `/api/auth/*` endpoints
- **story.routes.js**: `/api/stories/*` endpoints
- **token.routes.js**: `/api/token/*` endpoints
- **user.routes.js**: `/api/user/*` endpoints

#### Middleware (`backend/src/middleware/`)
- **auth.middleware.js**: JWT token verification for protected routes
- **errorHandler.js**: Centralized error handling

### Frontend Structure

#### Components (`frontend-web/src/app/components/`)
Reusable UI components:
- **navbar**: Navigation bar with authentication state
- **footer**: Footer with links and information

#### Pages (`frontend-web/src/app/pages/`)
Full page components:
- **home**: Landing page with hero and features
- **login**: User login form
- **register**: User registration form
- **stories**: Story listing and creation
- **dashboard**: User dashboard with stats
- **claim-tokens**: Token claiming interface

#### Services (`frontend-web/src/app/services/`)
Angular services for business logic:
- **auth.service.ts**: Authentication state management
- **language.service.ts**: Multi-language support
- **story.service.ts**: Story API interactions
- **web3.service.ts**: Blockchain interactions

#### Guards & Interceptors
- **auth.guard.ts**: Route protection for authenticated pages
- **auth.interceptor.ts**: Automatic JWT token injection

### Mobile Structure

#### Screens (`mobile-app/src/screens/`)
React Native screen components:
- Navigation handled by React Navigation
- Each screen is self-contained with its own state

#### Contexts (`mobile-app/src/contexts/`)
React Context for global state:
- **AuthContext**: User authentication state
- **LanguageContext**: Multi-language support

#### Styles (`mobile-app/src/styles/`)
- **globalStyles.js**: Shared styles and color constants

### Blockchain Structure

#### Contracts (`blockchain/contracts/`)
- **FertilityToken.sol**: ERC20 token with custom features
  - Inherits from OpenZeppelin contracts
  - Implements token claiming mechanism
  - Pausable for emergency stops

#### Scripts (`blockchain/scripts/`)
- **deploy.js**: Automated contract deployment with verification

#### Tests (`blockchain/test/`)
- **FertilityToken.test.js**: Comprehensive test suite using Hardhat

## 🔄 Data Flow

### Authentication Flow
```
User Input → Frontend/Mobile → POST /api/auth/login → Backend
                                                    ↓
                                              Validate User
                                                    ↓
                                            Generate JWT Token
                                                    ↓
Frontend/Mobile ← Response with Token ← Backend
       ↓
Store in LocalStorage/AsyncStorage
       ↓
Include in subsequent requests
```

### Story Creation Flow
```
User Input → Frontend/Mobile → POST /api/stories (with JWT)
                                       ↓
                                Verify JWT Token
                                       ↓
                                 Create Story
                                       ↓
                                  Save to MongoDB
                                       ↓
Frontend/Mobile ← Story Data ← Backend
```

### Token Claiming Flow
```
User → Connect Wallet → Get Wallet Address
            ↓
POST /api/token/claim → Backend → Verify User
            ↓                          ↓
    Smart Contract ← Call mint() ← Backend
            ↓
    Mint 1000 FERT tokens
            ↓
    Update User Record
            ↓
Frontend/Mobile ← Success Response
```

## 🔧 Configuration Files

### Backend Config
- `.env`: Environment variables (secrets, database URI, etc.)
- `package.json`: Node.js dependencies and scripts

### Frontend Config
- `angular.json`: Angular CLI configuration
- `tsconfig.json`: TypeScript compiler options
- `environment.ts`: Development environment variables
- `environment.prod.ts`: Production environment variables

### Mobile Config
- `app.json`: Expo configuration (app name, icons, etc.)
- `babel.config.js`: Babel transpiler configuration

### Blockchain Config
- `hardhat.config.js`: Hardhat network settings and deployment config

## 📦 Dependencies Overview

### Backend
- **express**: Web framework
- **mongoose**: MongoDB ODM
- **jsonwebtoken**: JWT authentication
- **ethers**: Ethereum library
- **helmet**: Security headers
- **cors**: Cross-origin resource sharing

### Frontend
- **@angular/core**: Angular framework
- **ethers**: Web3 integration
- **rxjs**: Reactive programming

### Mobile
- **react-native**: Mobile framework
- **expo**: Development tooling
- **@react-navigation**: Navigation library
- **axios**: HTTP client

### Blockchain
- **hardhat**: Development environment
- **@openzeppelin/contracts**: Secure contract templates
- **ethers**: Ethereum library

## 🎯 Key Features by Component

### Backend
- RESTful API design
- JWT authentication
- MongoDB integration
- Web3 blockchain integration
- Rate limiting
- Error handling
- Input validation

### Frontend
- Responsive design
- PWA support
- Web3 wallet integration
- Multi-language
- Route guards
- HTTP interceptors

### Mobile
- Native iOS/Android
- Offline storage
- Responsive layouts
- Cross-platform compatibility

### Blockchain
- ERC20 standard
- Ownable pattern
- Pausable functionality
- Gas optimization
- Event emission

---

This structure provides a clear separation of concerns and makes the project easy to navigate and maintain.

