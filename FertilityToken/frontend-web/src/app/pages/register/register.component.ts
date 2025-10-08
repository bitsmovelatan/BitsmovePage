import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="auth-page">
      <div class="container">
        <div class="auth-card card">
          <h1>{{ t('auth.register') }}</h1>
          
          @if (error) {
            <div class="alert alert-error">{{ error }}</div>
          }

          <form (ngSubmit)="onSubmit()" #registerForm="ngForm">
            <div class="form-group">
              <label>{{ t('auth.name') }}</label>
              <input 
                type="text" 
                [(ngModel)]="name" 
                name="name" 
                required
                [disabled]="loading"
              />
            </div>

            <div class="form-group">
              <label>{{ t('auth.email') }}</label>
              <input 
                type="email" 
                [(ngModel)]="email" 
                name="email" 
                required 
                email
                [disabled]="loading"
              />
            </div>

            <div class="form-group">
              <label>{{ t('auth.password') }}</label>
              <input 
                type="password" 
                [(ngModel)]="password" 
                name="password" 
                required
                minlength="6"
                [disabled]="loading"
              />
            </div>

            <div class="form-group">
              <label>Language / Idioma</label>
              <select [(ngModel)]="language" name="language" [disabled]="loading">
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </div>

            <button 
              type="submit" 
              class="btn btn-primary" 
              [disabled]="!registerForm.form.valid || loading"
            >
              @if (loading) {
                <span class="loading"></span>
              }
              {{ t('auth.register') }}
            </button>
          </form>

          <p class="auth-switch">
            {{ t('auth.haveAccount') }}
            <a routerLink="/login">{{ t('auth.login') }}</a>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-page {
      min-height: calc(100vh - 200px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem 0;
    }

    .auth-card {
      max-width: 450px;
      width: 100%;
      margin: 0 auto;
    }

    .auth-card h1 {
      text-align: center;
      color: var(--primary-color);
      margin-bottom: 2rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: var(--text-primary);
    }

    .form-group select {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      font-family: inherit;
      font-size: 1rem;
    }

    .auth-card button {
      width: 100%;
      margin-top: 1rem;
    }

    .auth-switch {
      text-align: center;
      margin-top: 1.5rem;
      color: var(--text-secondary);
    }

    .auth-switch a {
      color: var(--primary-color);
      font-weight: 500;
    }
  `]
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  language = 'en';
  error = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private languageService: LanguageService,
    private router: Router
  ) {
    this.language = this.languageService.currentLanguage();
  }

  t = (key: string) => this.languageService.translate(key);

  onSubmit() {
    this.error = '';
    this.loading = true;

    this.authService.register(this.email, this.password, this.name, this.language).subscribe({
      next: () => {
        this.languageService.setLanguage(this.language as 'en' | 'es');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.error = err.error?.error || 'Registration failed. Please try again.';
        this.loading = false;
      }
    });
  }
}

