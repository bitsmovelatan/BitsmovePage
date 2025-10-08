import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home">
      <!-- Hero Section -->
      <section class="hero">
        <div class="container">
          <div class="hero-content">
            <h1 class="hero-title">{{ t('home.title') }}</h1>
            <p class="hero-subtitle">{{ t('home.subtitle') }}</p>
            <div class="hero-actions">
              @if (!isAuthenticated()) {
                <a routerLink="/register" class="btn btn-primary">
                  {{ t('home.getStarted') }}
                </a>
              } @else {
                <a routerLink="/dashboard" class="btn btn-primary">
                  {{ t('dashboard.welcome') }}
                </a>
              }
              <a routerLink="/stories" class="btn btn-secondary">
                {{ t('home.learnMore') }}
              </a>
            </div>
          </div>
          <div class="hero-image">
            <div class="hero-illustration">🌸✨💜</div>
          </div>
        </div>
      </section>

      <!-- About Section -->
      <section class="section about">
        <div class="container">
          <div class="about-content">
            <h2>{{ t('home.about.title') }}</h2>
            <p>{{ t('home.about.text') }}</p>
          </div>
          
          <div class="features">
            <div class="feature-card">
              <div class="feature-icon">🤝</div>
              <h3>Community Support</h3>
              <p>Connect with others on similar journeys and share your experiences</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🪙</div>
              <h3>Token Rewards</h3>
              <p>Receive FertilityTokens to help fund your path to parenthood</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🔒</div>
              <h3>Blockchain Security</h3>
              <p>Built on Polygon for transparent and secure transactions</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🌍</div>
              <h3>Global Reach</h3>
              <p>Available in multiple languages to serve women worldwide</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta">
        <div class="container">
          <h2>Ready to Get Started?</h2>
          <p>Join our community today and take the first step</p>
          @if (!isAuthenticated()) {
            <a routerLink="/register" class="btn btn-primary">
              {{ t('home.getStarted') }}
            </a>
          }
        </div>
      </section>
    </div>
  `,
  styles: [`
    .hero {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 6rem 0;
    }

    .hero .container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
    }

    .hero-title {
      font-size: 3rem;
      margin-bottom: 1rem;
      line-height: 1.2;
    }

    .hero-subtitle {
      font-size: 1.25rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }

    .hero-actions {
      display: flex;
      gap: 1rem;
    }

    .hero-illustration {
      font-size: 8rem;
      text-align: center;
      animation: float 3s ease-in-out infinite;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }

    .about {
      text-align: center;
    }

    .about-content {
      max-width: 800px;
      margin: 0 auto 3rem;
    }

    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-top: 3rem;
    }

    .feature-card {
      background: var(--bg-primary);
      padding: 2rem;
      border-radius: 1rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    }

    .feature-card:hover {
      transform: translateY(-5px);
    }

    .feature-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .feature-card h3 {
      color: var(--primary-color);
      margin-bottom: 0.5rem;
    }

    .cta {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
      padding: 4rem 0;
      text-align: center;
    }

    .cta h2 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .cta p {
      font-size: 1.25rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }

    @media (max-width: 768px) {
      .hero .container {
        grid-template-columns: 1fr;
      }

      .hero-title {
        font-size: 2rem;
      }

      .hero-illustration {
        font-size: 4rem;
      }

      .hero-actions {
        flex-direction: column;
      }
    }
  `]
})
export class HomeComponent {
  isAuthenticated = this.authService.isAuthenticated;

  constructor(
    private languageService: LanguageService,
    private authService: AuthService
  ) {}

  t = (key: string) => this.languageService.translate(key);
}

