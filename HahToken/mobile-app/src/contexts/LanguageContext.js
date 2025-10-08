import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.stories': 'Stories',
    'nav.dashboard': 'Dashboard',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.logout': 'Logout',
    
    // Home
    'home.title': 'Empowering Infertile Women to Build a Family',
    'home.subtitle': 'Join our supportive community and access resources through blockchain technology',
    'home.getStarted': 'Get Started',
    'home.learnMore': 'Learn More',
    
    // Auth
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.name': 'Full Name',
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.haveAccount': 'Already have an account?',
    'auth.noAccount': "Don't have an account?",
    
    // Stories
    'stories.title': 'Community Stories',
    'stories.share': 'Share Your Story',
    'stories.submit': 'Submit Story',
    
    // Dashboard
    'dashboard.welcome': 'Welcome',
    'dashboard.tokens': 'Your Tokens',
    'dashboard.claimTokens': 'Claim Tokens',
    
    // Common
    'common.loading': 'Loading...',
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.stories': 'Historias',
    'nav.dashboard': 'Panel',
    'nav.login': 'Iniciar Sesión',
    'nav.register': 'Registrarse',
    'nav.logout': 'Cerrar Sesión',
    
    // Home
    'home.title': 'Empoderando a Mujeres con Infertilidad para Formar una Familia',
    'home.subtitle': 'Únete a nuestra comunidad de apoyo y accede a recursos mediante tecnología blockchain',
    'home.getStarted': 'Comenzar',
    'home.learnMore': 'Aprender Más',
    
    // Auth
    'auth.email': 'Correo Electrónico',
    'auth.password': 'Contraseña',
    'auth.name': 'Nombre Completo',
    'auth.login': 'Iniciar Sesión',
    'auth.register': 'Registrarse',
    'auth.haveAccount': '¿Ya tienes una cuenta?',
    'auth.noAccount': '¿No tienes una cuenta?',
    
    // Stories
    'stories.title': 'Historias de la Comunidad',
    'stories.share': 'Comparte Tu Historia',
    'stories.submit': 'Enviar Historia',
    
    // Dashboard
    'dashboard.welcome': 'Bienvenida',
    'dashboard.tokens': 'Tus Tokens',
    'dashboard.claimTokens': 'Reclamar Tokens',
    
    // Common
    'common.loading': 'Cargando...',
    'common.submit': 'Enviar',
    'common.cancel': 'Cancelar',
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const storedLang = await AsyncStorage.getItem('language');
      if (storedLang) {
        setLanguage(storedLang);
      } else {
        const deviceLang = Localization.locale.split('-')[0];
        setLanguage(deviceLang === 'es' ? 'es' : 'en');
      }
    } catch (error) {
      console.error('Error loading language:', error);
    }
  };

  const changeLanguage = async (lang) => {
    try {
      await AsyncStorage.setItem('language', lang);
      setLanguage(lang);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    changeLanguage,
    t
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

