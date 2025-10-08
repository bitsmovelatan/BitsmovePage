import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="footer">
      <div class="container footer-content">
        <div class="footer-section">
          <h3>😄 HahToken</h3>
          <p>Your innovative digital token platform</p>
        </div>
        
        <div class="footer-section">
          <h4>Quick Links</h4>
          <a routerLink="/">Home</a>
          <a routerLink="/stories">Stories</a>
          <a routerLink="/dashboard">Dashboard</a>
        </div>
        
        <div class="footer-section">
          <h4>Resources</h4>
          <a href="https://polygon.technology" target="_blank">Polygon</a>
          <a href="https://github.com" target="_blank">GitHub</a>
          <a href="#" target="_blank">Documentation</a>
        </div>
        
        <div class="footer-section">
          <h4>Contact</h4>
          <p>support&#64;hahtoken.com</p>
          <div class="social-links">
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="Discord">💬</a>
            <a href="#" aria-label="Telegram">✈️</a>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <div class="container">
          <p>&copy; 2024 FertilityToken. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: var(--text-primary);
      color: white;
      margin-top: 4rem;
    }

    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
      padding: 3rem 1.5rem;
    }

    .footer-section h3 {
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }

    .footer-section h4 {
      margin-bottom: 1rem;
      color: var(--primary-light);
    }

    .footer-section p {
      color: #9ca3af;
      margin-bottom: 0.5rem;
    }

    .footer-section a {
      display: block;
      color: #9ca3af;
      margin-bottom: 0.5rem;
      transition: color 0.3s ease;
    }

    .footer-section a:hover {
      color: white;
    }

    .social-links {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }

    .social-links a {
      font-size: 1.5rem;
      display: inline-block;
    }

    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding: 1.5rem 0;
      text-align: center;
    }

    .footer-bottom p {
      color: #9ca3af;
      margin: 0;
    }
  `]
})
export class FooterComponent {}

