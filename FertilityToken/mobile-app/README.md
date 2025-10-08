# FertilityToken Mobile App (React Native + Expo)

Mobile application for the FertilityToken platform built with React Native and Expo.

## Features

- 📱 Native iOS and Android support
- 🔐 JWT Authentication
- 🌐 Multi-language support (English & Spanish)
- 📖 Story sharing platform
- 📊 User dashboard
- 🪙 Token claiming functionality
- ⚡ Fast and responsive

## Prerequisites

- Node.js 18+
- Expo CLI
- iOS Simulator (Mac only) or Android Emulator
- Expo Go app (for testing on physical devices)

## Installation

```bash
# Install dependencies
npm install

# Install Expo CLI globally (if not installed)
npm install -g expo-cli
```

## Configuration

Update `app.json` with your configuration:

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

**Important:** When testing on a physical device or emulator, replace `localhost` with your computer's IP address.

## Running the App

```bash
# Start Expo development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web
npm run web
```

## Testing on Physical Devices

1. Install Expo Go app on your device
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android: [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Start the development server:
   ```bash
   npm start
   ```

3. Scan the QR code with:
   - iOS: Camera app
   - Android: Expo Go app

## Project Structure

```
mobile-app/
├── src/
│   ├── contexts/        # React contexts (Auth, Language)
│   ├── screens/         # Screen components
│   ├── styles/          # Global styles
│   └── ...
├── App.js               # Main app entry
├── app.json             # Expo configuration
└── package.json         # Dependencies
```

## Screens

- **HomeScreen**: Landing page with hero and features
- **LoginScreen**: User authentication
- **RegisterScreen**: New user registration
- **StoriesScreen**: View and share community stories
- **DashboardScreen**: User dashboard with token info
- **ClaimTokensScreen**: Token claiming interface

## Building for Production

### iOS

```bash
# Build for iOS
expo build:ios

# Or use EAS Build (recommended)
eas build --platform ios
```

### Android

```bash
# Build APK
expo build:android -t apk

# Build AAB (for Play Store)
expo build:android -t app-bundle

# Or use EAS Build (recommended)
eas build --platform android
```

## Publishing

```bash
# Publish to Expo
expo publish

# Or use EAS Update
eas update
```

## Environment Variables

The app uses Expo's `extra` configuration in `app.json` for environment variables:

- `apiUrl`: Backend API URL
- `polygonRpcUrl`: Polygon RPC endpoint
- `contractAddress`: Smart contract address

## Features Guide

### Authentication
- JWT-based authentication with AsyncStorage
- Automatic token persistence
- Protected routes

### Multi-language
- English and Spanish support
- Auto-detection of device language
- Easy language switching

### Offline Storage
- AsyncStorage for local data persistence
- Token and user data caching

## Troubleshooting

### Metro bundler issues
```bash
expo start -c
```

### Module not found errors
```bash
rm -rf node_modules
npm install
```

### iOS simulator issues
```bash
expo start --ios
```

### Android emulator issues
```bash
expo start --android
```

## Testing

The app can be tested using:
- Expo Go on physical devices
- iOS Simulator (Mac only)
- Android Emulator
- Web browser

## Dependencies

Key dependencies:
- React Native
- Expo SDK
- React Navigation
- Axios
- AsyncStorage
- Ethers.js

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT

