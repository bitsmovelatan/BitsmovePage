import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './Services.css';

const Services: React.FC = () => {
  const { t, translations, isLoading } = useLanguage();

  // Check if translations are loaded
  if (isLoading || !translations || Object.keys(translations).length === 0) {
    return <div>Loading...</div>;
  }

  const services = [
    {
      key: 'smart_contracts',
      icon: '🔗',
      color: '#3b82f6'
    },
    {
      key: 'defi',
      icon: '💰',
      color: '#10b981'
    },
    {
      key: 'nft',
      icon: '🎨',
      color: '#8b5cf6'
    },
    {
      key: 'dao',
      icon: '🗳️',
      color: '#f59e0b'
    },
    {
      key: 'tokenization',
      icon: '🏛️',
      color: '#ef4444'
    },
    {
      key: 'infrastructure',
      icon: '⚡',
      color: '#06b6d4'
    }
  ];

  return (
    <section id="services" className="services">
      <div className="services-container">
        <div className="services-header">
          <h2 className="services-title">{t('services.title')}</h2>
          <p className="services-subtitle">{t('services.subtitle')}</p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div key={service.key} className="service-card">
              <div 
                className="service-icon"
                style={{ backgroundColor: service.color }}
              >
                {service.icon}
              </div>
              
              <div className="service-content">
                <h3 className="service-title">
                  {t(`services.${service.key}.title`)}
                </h3>
                <p className="service-description">
                  {t(`services.${service.key}.description`)}
                </p>
                
                <ul className="service-features">
                  {(() => {
                    const features = t(`services.${service.key}.features`);
                    if (Array.isArray(features)) {
                      return features.map((feature: string, index: number) => (
                        <li key={index} className="service-feature">
                          <span className="feature-icon">✓</span>
                          {feature}
                        </li>
                      ));
                    }
                    return null;
                  })()}
                </ul>
                
                <button className="service-button">
                  {t('common.learn_more')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
