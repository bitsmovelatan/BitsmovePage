import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './Products.css';

const Products: React.FC = () => {
  const { t, translations, isLoading } = useLanguage();

  // Check if translations are loaded
  if (isLoading || !translations || Object.keys(translations).length === 0) {
    return <div>Loading...</div>;
  }

  const products = [
    {
      key: 'wallet',
      icon: '💼',
      color: '#3b82f6',
      gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
    },
    {
      key: 'dex',
      icon: '🔄',
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981, #059669)'
    },
    {
      key: 'nft_platform',
      icon: '🎨',
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
    },
    {
      key: 'dao_tools',
      icon: '🗳️',
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b, #d97706)'
    },
    {
      key: 'developer_tools',
      icon: '🛠️',
      color: '#06b6d4',
      gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)'
    }
  ];

  return (
    <section id="products" className="products">
      <div className="products-container">
        <div className="products-header">
          <h2 className="products-title">{t('products.title')}</h2>
          <p className="products-subtitle">{t('products.subtitle')}</p>
        </div>

        <div className="products-grid">
          {products.map((product, index) => (
            <div key={product.key} className="product-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="product-header">
                <div 
                  className="product-icon"
                  style={{ 
                    background: product.gradient,
                    boxShadow: `0 8px 32px ${product.color}40`
                  }}
                >
                  {product.icon}
                </div>
                
                <div className="product-badge">
                  <span className="badge-text">Live</span>
                </div>
              </div>
              
              <div className="product-content">
                <h3 className="product-title">
                  {t(`products.${product.key}.title`)}
                </h3>
                <p className="product-description">
                  {t(`products.${product.key}.description`)}
                </p>
                
                <div className="product-features">
                  <h4 className="features-title">Key Features</h4>
                  <div className="features-grid">
                    {(() => {
                      const features = t(`products.${product.key}.features`);
                      if (Array.isArray(features)) {
                        return features.map((feature: string, featureIndex: number) => (
                          <div key={featureIndex} className="feature-item">
                            <div className="feature-dot"></div>
                            <span className="feature-text">{feature}</span>
                          </div>
                        ));
                      }
                      return null;
                    })()}
                  </div>
                </div>
                
                <div className="product-actions">
                  <button className="product-button primary">
                    {t('common.get_started')}
                  </button>
                  <button className="product-button secondary">
                    {t('common.learn_more')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="products-cta">
          <div className="cta-content">
            <h3 className="cta-title">Ready to Build the Future?</h3>
            <p className="cta-description">
              Join thousands of developers and businesses already using Bitsmove products
            </p>
            <button className="cta-button">
              {t('common.get_started')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
