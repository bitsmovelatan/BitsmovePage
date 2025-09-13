import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './Infrastructure.css';

const Infrastructure: React.FC = () => {
  const { t, translations, isLoading } = useLanguage();

  // Check if translations are loaded
  if (isLoading || !translations || Object.keys(translations).length === 0) {
    return <div>Loading...</div>;
  }

  const infrastructureItems = [
    {
      key: 'nodes',
      icon: '🖥️',
      color: '#3b82f6',
      stats: ['99.9% Uptime', 'Global CDN', 'Auto-scaling']
    },
    {
      key: 'cloud',
      icon: '☁️',
      color: '#10b981',
      stats: ['Multi-region', 'Edge Computing', 'Cost Optimization']
    },
    {
      key: 'apis',
      icon: '🔌',
      color: '#8b5cf6',
      stats: ['REST & GraphQL', 'Real-time Data', 'Rate Limiting']
    },
    {
      key: 'security',
      icon: '🛡️',
      color: '#ef4444',
      stats: ['Multi-signature', 'Hardware Security', 'Audit Services']
    },
    {
      key: 'monitoring',
      icon: '📊',
      color: '#f59e0b',
      stats: ['Real-time Alerts', 'Performance Analytics', 'Custom Dashboards']
    }
  ];

  return (
    <section id="infrastructure" className="infrastructure">
      <div className="infrastructure-container">
        <div className="infrastructure-header">
          <h2 className="infrastructure-title">{t('infrastructure.title')}</h2>
          <p className="infrastructure-subtitle">{t('infrastructure.subtitle')}</p>
        </div>

        <div className="infrastructure-grid">
          {infrastructureItems.map((item, index) => (
            <div key={item.key} className="infrastructure-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="card-header">
                <div 
                  className="card-icon"
                  style={{ 
                    background: `linear-gradient(135deg, ${item.color}, ${item.color}cc)`,
                    boxShadow: `0 8px 32px ${item.color}40`
                  }}
                >
                  {item.icon}
                </div>
                
                <div className="card-status">
                  <div className="status-indicator active"></div>
                  <span className="status-text">Active</span>
                </div>
              </div>
              
              <div className="card-content">
                <h3 className="card-title">
                  {t(`infrastructure.${item.key}.title`)}
                </h3>
                <p className="card-description">
                  {t(`infrastructure.${item.key}.description`)}
                </p>
                
                <div className="card-features">
                  {(() => {
                    const features = t(`infrastructure.${item.key}.features`);
                    if (Array.isArray(features)) {
                      return features.map((feature: string, featureIndex: number) => (
                        <div key={featureIndex} className="feature-item">
                          <div className="feature-icon">✓</div>
                          <span className="feature-text">{feature}</span>
                        </div>
                      ));
                    }
                    return null;
                  })()}
                </div>
                
                <div className="card-stats">
                  <h4 className="stats-title">Key Metrics</h4>
                  <div className="stats-grid">
                    {item.stats.map((stat, statIndex) => (
                      <div key={statIndex} className="stat-item">
                        <div className="stat-value">{stat}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <button className="card-button">
                  {t('common.learn_more')}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="infrastructure-overview">
          <div className="overview-content">
            <h3 className="overview-title">Enterprise-Grade Infrastructure</h3>
            <p className="overview-description">
              Our infrastructure is built for scale, security, and reliability. 
              We provide the foundation for your Web3 applications with 24/7 monitoring and support.
            </p>
            
            <div className="overview-stats">
              <div className="overview-stat">
                <div className="stat-number">99.99%</div>
                <div className="stat-label">Uptime SLA</div>
              </div>
              <div className="overview-stat">
                <div className="stat-number">&lt;50ms</div>
                <div className="stat-label">Global Latency</div>
              </div>
              <div className="overview-stat">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Support</div>
              </div>
              <div className="overview-stat">
                <div className="stat-number">100+</div>
                <div className="stat-label">Regions</div>
              </div>
            </div>
          </div>
          
          <div className="overview-visual">
            <div className="infrastructure-diagram">
              <div className="diagram-center">
                <div className="center-node">Bitsmove Core</div>
              </div>
              <div className="diagram-nodes">
                <div className="diagram-node">API Gateway</div>
                <div className="diagram-node">Load Balancer</div>
                <div className="diagram-node">Blockchain Nodes</div>
                <div className="diagram-node">CDN</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Infrastructure;
