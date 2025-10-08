import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <nav class="navbar">
      <div class="container navbar-content">
        <a routerLink="/" class="logo">
          <span class="logo-icon">😄</span>
          <span class="logo-text">HahToken</span>
        </a>
        
        <div class="nav-links">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
            {{ t('nav.home') }}
          </a>
          <a routerLink="/stories" routerLinkActive="active">
            {{ t('nav.stories') }}
          </a>
          @if (isAuthenticated()) {
            <a routerLink="/dashboard" routerLinkActive="active">
              {{ t('nav.dashboard') }}
            </a>
          }
        </div>

        <div class="nav-actions">
          <select [(ngModel)]="selectedLang" (change)="changeLang()" class="lang-selector">
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>

          @if (isAuthenticated()) {
            <button (click)="logout()" class="btn btn-secondary">
              {{ t('nav.logout') }}
            </button>
          } @else {
            <a routerLink="/login" class="btn btn-secondary">
              {{ t('nav.login') }}
            </a>
            <a routerLink="/register" class="btn btn-primary">
              {{ t('nav.register') }}
            </a>
          }
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: var(--bg-primary);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      padding: 1rem 0;
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .navbar-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary-color);
      text-decoration: none;
    }

    .logo-icon {
      font-size: 2rem;
    }

    .nav-links {
      display: flex;
      gap: 2rem;
      flex: 1;
      justify-content: center;
    }

    .nav-links a {
      color: var(--text-primary);
      font-weight: 500;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      transition: all 0.3s ease;
    }

    .nav-links a:hover {
      background: var(--bg-secondary);
      color: var(--primary-color);
    }

    .nav-links a.active {
      color: var(--primary-color);
      background: rgba(124, 58, 237, 0.1);
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .lang-selector {
      padding: 0.5rem;
      border-radius: 0.5rem;
      border: 1px solid var(--border-color);
      background: var(--bg-primary);
      cursor: pointer;
    }

    @media (max-width: 768px) {
      .navbar-content {
        flex-wrap: wrap;
      }
      
      .nav-links {
        order: 3;
        width: 100%;
        justify-content: space-around;
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid var(--border-color);
      }

      .logo-text {
        display: none;
      }
    }
  `]
})
export class NavbarComponent {
  isAuthenticated = this.authService.isAuthenticated;
  selectedLang = this.languageService.currentLanguage();

  constructor(
    private authService: AuthService,
    private languageService: LanguageService
  ) {}

  t = (key: string) => this.languageService.translate(key);

  changeLang() {
    this.languageService.setLanguage(this.selectedLang as 'en' | 'es');
  }

  logout() {
    this.authService.logout();
  }
}

