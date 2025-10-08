import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/contexts/AuthContext';
import { LanguageProvider } from './src/contexts/LanguageContext';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import StoriesScreen from './src/screens/StoriesScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import ClaimTokensScreen from './src/screens/ClaimTokensScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#7c3aed',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen 
              name="Home" 
              component={HomeScreen}
              options={{ title: 'FertilityToken' }}
            />
            <Stack.Screen 
              name="Login" 
              component={LoginScreen}
              options={{ title: 'Login' }}
            />
            <Stack.Screen 
              name="Register" 
              component={RegisterScreen}
              options={{ title: 'Register' }}
            />
            <Stack.Screen 
              name="Stories" 
              component={StoriesScreen}
              options={{ title: 'Community Stories' }}
            />
            <Stack.Screen 
              name="Dashboard" 
              component={DashboardScreen}
              options={{ title: 'Dashboard' }}
            />
            <Stack.Screen 
              name="ClaimTokens" 
              component={ClaimTokensScreen}
              options={{ title: 'Claim Tokens' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </LanguageProvider>
  );
}

