import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth0 } from '@auth0/auth0-react';
import './Navigation.css';

const Navigation: React.FC = () => {
  const { t, language, changeLanguage } = useLanguage();
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <img src="/img/BitsmoveLogo.png" alt="Bitsmove" className="logo" />
          <span className="brand-text">Bitsmove</span>
        </div>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <button 
            className="nav-link" 
            onClick={() => scrollToSection('home')}
          >
            {t('navigation.home')}
          </button>
          <button 
            className="nav-link" 
            onClick={() => scrollToSection('services')}
          >
            {t('navigation.services')}
          </button>
          <button 
            className="nav-link" 
            onClick={() => scrollToSection('products')}
          >
            {t('navigation.products')}
          </button>
          <button 
            className="nav-link" 
            onClick={() => scrollToSection('infrastructure')}
          >
            {t('navigation.infrastructure')}
          </button>
          <button 
            className="nav-link" 
            onClick={() => scrollToSection('about')}
          >
            {t('navigation.about')}
          </button>
          <button 
            className="nav-link" 
            onClick={() => scrollToSection('contact')}
          >
            {t('navigation.contact')}
          </button>
        </div>

        <div className="nav-actions">
          <div className="language-selector">
            <button
              className="language-button"
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            >
              <span className="flag">{currentLanguage.flag}</span>
              <span className="language-name">{currentLanguage.name}</span>
              <i className={`fa fa-chevron-${isLanguageOpen ? 'up' : 'down'}`}></i>
            </button>
            {isLanguageOpen && (
              <div className="language-dropdown">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={`language-option ${language === lang.code ? 'active' : ''}`}
                    onClick={() => {
                      changeLanguage(lang.code);
                      setIsLanguageOpen(false);
                    }}
                  >
                    <span className="flag">{lang.flag}</span>
                    <span className="language-name">{lang.name}</span>
                    {language === lang.code && <i className="fa fa-check"></i>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {isAuthenticated ? (
            <div className="user-menu">
              <span className="user-name">{user?.name}</span>
              <button 
                className="btn btn-secondary"
                onClick={() => logout()}
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              className="btn btn-primary"
              onClick={() => loginWithRedirect()}
            >
              {t('navigation.login')}
            </button>
          )}

          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
