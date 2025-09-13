import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './Contact.css';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      name: 'twitter',
      icon: '🐦',
      url: '#'
    },
    {
      name: 'linkedin',
      icon: '💼',
      url: '#'
    },
    {
      name: 'github',
      icon: '💻',
      url: '#'
    },
    {
      name: 'discord',
      icon: '💬',
      url: '#'
    }
  ];

  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="contact-title">{t('contact.title')}</h2>
          <p className="contact-subtitle">{t('contact.subtitle')}</p>
        </div>

        <div className="contact-content">
          <div className="contact-form-section">
            <div className="form-container">
              <h3 className="form-title">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      {t('contact.form.name')} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      {t('contact.form.email')} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="company" className="form-label">
                      {t('contact.form.company')}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">
                      {t('contact.form.subject')} *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    {t('contact.form.message')} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="form-textarea"
                    rows={5}
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="form-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
                </button>

                {submitStatus === 'success' && (
                  <div className="form-message success">
                    {t('contact.form.success')}
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="form-message error">
                    {t('contact.form.error')}
                  </div>
                )}
              </form>
            </div>
          </div>

          <div className="contact-info-section">
            <div className="info-container">
              <h3 className="info-title">{t('contact.info.title')}</h3>
              
              <div className="info-items">
                <div className="info-item">
                  <div className="info-icon">📍</div>
                  <div className="info-content">
                    <h4 className="info-label">{t('contact.info.address_label')}</h4>
                    <p className="info-text">{t('contact.info.address')}</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">📞</div>
                  <div className="info-content">
                    <h4 className="info-label">{t('contact.info.phone_label')}</h4>
                    <p className="info-text">{t('contact.info.phone')}</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">✉️</div>
                  <div className="info-content">
                    <h4 className="info-label">{t('contact.info.email_label')}</h4>
                    <p className="info-text">{t('contact.info.email')}</p>
                  </div>
                </div>
              </div>

              <div className="social-section">
                <h4 className="social-title">{t('contact.social.title')}</h4>
                <div className="social-links">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      className="social-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="social-icon">{social.icon}</span>
                      <span className="social-name">{t(`contact.social.${social.name}`)}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
