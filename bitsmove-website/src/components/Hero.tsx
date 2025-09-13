import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './Hero.css';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="hero-overlay"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-container">
          <div className="hero-text">
            <h1 className="hero-title">
              {t('hero.title')}
            </h1>
            <h2 className="hero-subtitle">
              {t('hero.subtitle')}
            </h2>
            <p className="hero-description">
              {t('hero.description')}
            </p>
            
            <div className="hero-actions">
              <button 
                className="btn btn-primary btn-large"
                onClick={() => scrollToSection('services')}
              >
                {t('hero.cta_primary')}
              </button>
              <button 
                className="btn btn-secondary btn-large"
                onClick={() => scrollToSection('about')}
              >
                {t('hero.cta_secondary')}
              </button>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="hero-cards">
              <div className="hero-card card-1">
                <div className="card-icon">🔗</div>
                <h3>Web3 Services</h3>
                <p>Smart Contracts & DeFi</p>
              </div>
              <div className="hero-card card-2">
                <div className="card-icon">🏗️</div>
                <h3>Products</h3>
                <p>Wallets & Platforms</p>
              </div>
              <div className="hero-card card-3">
                <div className="card-icon">⚡</div>
                <h3>Infrastructure</h3>
                <p>Nodes & Cloud Solutions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="hero-stats">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">500+</div>
            <div className="stat-label">Smart Contracts</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Products Launched</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">99.9%</div>
            <div className="stat-label">Uptime</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
