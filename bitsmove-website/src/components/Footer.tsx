import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './Footer.css';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section company-section">
            <div className="footer-brand">
              <img src="/img/BitsmoveLogo.png" alt="Bitsmove" className="footer-logo" />
              <span className="footer-brand-text">Bitsmove</span>
            </div>
            <p className="footer-description">
              {t('footer.company.description')}
            </p>
            <div className="footer-social">
              <a href="https://twitter.com/bitsmove" className="social-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                <span className="social-icon">🐦</span>
              </a>
              <a href="https://linkedin.com/company/bitsmove" className="social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <span className="social-icon">💼</span>
              </a>
              <a href="https://github.com/bitsmove" className="social-link" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                <span className="social-icon">💻</span>
              </a>
              <a href="https://discord.gg/bitsmove" className="social-link" aria-label="Discord" target="_blank" rel="noopener noreferrer">
                <span className="social-icon">💬</span>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">{t('footer.services')}</h3>
            <ul className="footer-links">
              <li>
                <button 
                  className="footer-link" 
                  onClick={() => scrollToSection('services')}
                >
                  Smart Contracts
                </button>
              </li>
              <li>
                <button 
                  className="footer-link" 
                  onClick={() => scrollToSection('services')}
                >
                  DeFi Solutions
                </button>
              </li>
              <li>
                <button 
                  className="footer-link" 
                  onClick={() => scrollToSection('services')}
                >
                  NFT Marketplaces
                </button>
              </li>
              <li>
                <button 
                  className="footer-link" 
                  onClick={() => scrollToSection('services')}
                >
                  DAO Development
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">{t('footer.products')}</h3>
            <ul className="footer-links">
              <li>
                <button 
                  className="footer-link" 
                  onClick={() => scrollToSection('products')}
                >
                  Bitsmove Wallet
                </button>
              </li>
              <li>
                <button 
                  className="footer-link" 
                  onClick={() => scrollToSection('products')}
                >
                  DEX Platform
                </button>
              </li>
              <li>
                <button 
                  className="footer-link" 
                  onClick={() => scrollToSection('products')}
                >
                  NFT Platform
                </button>
              </li>
              <li>
                <button 
                  className="footer-link" 
                  onClick={() => scrollToSection('products')}
                >
                  Developer Tools
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">{t('footer.infrastructure')}</h3>
            <ul className="footer-links">
              <li>
                <button 
                  className="footer-link" 
                  onClick={() => scrollToSection('infrastructure')}
                >
                  Blockchain Nodes
                </button>
              </li>
              <li>
                <button 
                  className="footer-link" 
                  onClick={() => scrollToSection('infrastructure')}
                >
                  Cloud Solutions
                </button>
              </li>
              <li>
                <button 
                  className="footer-link" 
                  onClick={() => scrollToSection('infrastructure')}
                >
                  API Services
                </button>
              </li>
              <li>
                <button 
                  className="footer-link" 
                  onClick={() => scrollToSection('infrastructure')}
                >
                  Security Solutions
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">{t('footer.company_info')}</h3>
            <ul className="footer-links">
              <li>
                <button 
                  className="footer-link" 
                  onClick={() => scrollToSection('about')}
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  className="footer-link" 
                  onClick={() => scrollToSection('contact')}
                >
                  Contact
                </button>
              </li>
              <li>
                <a href="https://blog.bitsmove.com" className="footer-link" target="_blank" rel="noopener noreferrer">
                  Blog
                </a>
              </li>
              <li>
                <a href="https://careers.bitsmove.com" className="footer-link" target="_blank" rel="noopener noreferrer">
                  Careers
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-legal">
            <div className="footer-copyright">
              {t('footer.copyright')}
            </div>
            <div className="footer-legal-links">
              <a href="https://bitsmove.com/privacy" className="legal-link" target="_blank" rel="noopener noreferrer">
                {t('footer.privacy_policy')}
              </a>
              <a href="https://bitsmove.com/terms" className="legal-link" target="_blank" rel="noopener noreferrer">
                {t('footer.terms_of_service')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
