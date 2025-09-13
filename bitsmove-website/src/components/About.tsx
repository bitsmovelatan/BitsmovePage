import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './About.css';

const About: React.FC = () => {
  const { t } = useLanguage();

  const values = [
    {
      key: 'innovation',
      icon: '💡',
      color: '#3b82f6'
    },
    {
      key: 'security',
      icon: '🔒',
      color: '#10b981'
    },
    {
      key: 'transparency',
      icon: '🔍',
      color: '#8b5cf6'
    },
    {
      key: 'community',
      icon: '🤝',
      color: '#f59e0b'
    }
  ];

  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="about-header">
          <h2 className="about-title">{t('about.title')}</h2>
          <p className="about-subtitle">{t('about.subtitle')}</p>
        </div>

        <div className="about-content">
          <div className="about-mission">
            <div className="mission-content">
              <h3 className="mission-title">{t('about.mission.title')}</h3>
              <p className="mission-description">{t('about.mission.description')}</p>
            </div>
          </div>

          <div className="about-vision">
            <div className="vision-content">
              <h3 className="vision-title">{t('about.vision.title')}</h3>
              <p className="vision-description">{t('about.vision.description')}</p>
            </div>
          </div>

          <div className="about-values">
            <h3 className="values-title">{t('about.values.title')}</h3>
            <div className="values-grid">
              {values.map((value, index) => (
                <div key={value.key} className="value-card" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div 
                    className="value-icon"
                    style={{ backgroundColor: value.color }}
                  >
                    {value.icon}
                  </div>
                  <h4 className="value-title">{t(`about.values.${value.key}.title`)}</h4>
                  <p className="value-description">{t(`about.values.${value.key}.description`)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="about-team">
            <div className="team-content">
              <h3 className="team-title">{t('about.team.title')}</h3>
              <p className="team-description">{t('about.team.description')}</p>
              <button className="team-button">
                {t('common.learn_more')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
