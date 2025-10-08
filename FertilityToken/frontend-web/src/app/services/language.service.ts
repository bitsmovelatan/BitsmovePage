import { Injectable, signal } from '@angular/core';

export type Language = 'en' | 'es';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  public currentLanguage = signal<Language>('en');

  private translations: Translations = {
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
      'home.about.title': 'About FertilityToken',
      'home.about.text': 'FertilityToken is a platform that combines blockchain technology with community support to help women facing infertility challenges. Share your story, connect with others, and receive tokens that can help fund your journey to parenthood.',
      
      // Stories
      'stories.title': 'Community Stories',
      'stories.share': 'Share Your Story',
      'stories.anonymous': 'Post Anonymously',
      'stories.titleField': 'Title',
      'stories.contentField': 'Your Story',
      'stories.submit': 'Submit Story',
      'stories.likes': 'likes',
      
      // Dashboard
      'dashboard.welcome': 'Welcome',
      'dashboard.tokens': 'Your Tokens',
      'dashboard.claimTokens': 'Claim Tokens',
      'dashboard.myStories': 'My Stories',
      'dashboard.profile': 'Profile',
      
      // Auth
      'auth.email': 'Email',
      'auth.password': 'Password',
      'auth.name': 'Full Name',
      'auth.login': 'Login',
      'auth.register': 'Register',
      'auth.haveAccount': 'Already have an account?',
      'auth.noAccount': "Don't have an account?",
      
      // Common
      'common.loading': 'Loading...',
      'common.submit': 'Submit',
      'common.cancel': 'Cancel',
      'common.save': 'Save',
      'common.delete': 'Delete',
      'common.edit': 'Edit',
      'common.back': 'Back',
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
      'home.about.title': 'Acerca de FertilityToken',
      'home.about.text': 'FertilityToken es una plataforma que combina tecnología blockchain con apoyo comunitario para ayudar a mujeres que enfrentan desafíos de infertilidad. Comparte tu historia, conéctate con otras personas y recibe tokens que pueden ayudar a financiar tu camino hacia la maternidad.',
      
      // Stories
      'stories.title': 'Historias de la Comunidad',
      'stories.share': 'Comparte Tu Historia',
      'stories.anonymous': 'Publicar Anónimamente',
      'stories.titleField': 'Título',
      'stories.contentField': 'Tu Historia',
      'stories.submit': 'Enviar Historia',
      'stories.likes': 'me gusta',
      
      // Dashboard
      'dashboard.welcome': 'Bienvenida',
      'dashboard.tokens': 'Tus Tokens',
      'dashboard.claimTokens': 'Reclamar Tokens',
      'dashboard.myStories': 'Mis Historias',
      'dashboard.profile': 'Perfil',
      
      // Auth
      'auth.email': 'Correo Electrónico',
      'auth.password': 'Contraseña',
      'auth.name': 'Nombre Completo',
      'auth.login': 'Iniciar Sesión',
      'auth.register': 'Registrarse',
      'auth.haveAccount': '¿Ya tienes una cuenta?',
      'auth.noAccount': '¿No tienes una cuenta?',
      
      // Common
      'common.loading': 'Cargando...',
      'common.submit': 'Enviar',
      'common.cancel': 'Cancelar',
      'common.save': 'Guardar',
      'common.delete': 'Eliminar',
      'common.edit': 'Editar',
      'common.back': 'Volver',
    }
  };

  constructor() {}

  initLanguage() {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'es')) {
      this.currentLanguage.set(savedLang);
    } else {
      const browserLang = navigator.language.split('-')[0];
      this.currentLanguage.set(browserLang === 'es' ? 'es' : 'en');
    }
  }

  setLanguage(lang: Language) {
    this.currentLanguage.set(lang);
    localStorage.setItem('language', lang);
  }

  translate(key: string): string {
    const lang = this.currentLanguage();
    return this.translations[lang][key] || key;
  }

  t = (key: string) => this.translate(key);
}

