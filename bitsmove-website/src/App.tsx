import React from 'react';
import { Auth0Provider } from './contexts/Auth0Provider';
import { LanguageProvider } from './contexts/LanguageContext';
import ErrorBoundary from './components/ErrorBoundary';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Services from './components/Services';
import Products from './components/Products';
import Infrastructure from './components/Infrastructure';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Auth0Provider>
        <LanguageProvider>
          <div className="App">
            <Navigation />
            <Hero />
            <ErrorBoundary fallback={<div>Error loading services</div>}>
              <Services />
            </ErrorBoundary>
            <ErrorBoundary fallback={<div>Error loading products</div>}>
              <Products />
            </ErrorBoundary>
            <ErrorBoundary fallback={<div>Error loading infrastructure</div>}>
              <Infrastructure />
            </ErrorBoundary>
            <About />
            <Contact />
            <Footer />
          </div>
        </LanguageProvider>
      </Auth0Provider>
    </ErrorBoundary>
  );
};

export default App;