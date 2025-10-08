import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="auth-page">
      <div class="container">
        <div class="auth-card card">
          <h1>{{ t('auth.login') }}</h1>
          
          @if (error) {
            <div class="alert alert-error">{{ error }}</div>
          }

          <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
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

            <button 
              type="submit" 
              class="btn btn-primary" 
              [disabled]="!loginForm.form.valid || loading"
            >
              @if (loading) {
                <span class="loading"></span>
              }
              {{ t('auth.login') }}
            </button>
          </form>

          <p class="auth-switch">
            {{ t('auth.noAccount') }}
            <a routerLink="/register">{{ t('auth.register') }}</a>
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
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private languageService: LanguageService,
    private router: Router
  ) {}

  t = (key: string) => this.languageService.translate(key);

  onSubmit() {
    this.error = '';
    this.loading = true;

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.error = err.error?.error || 'Login failed. Please try again.';
        this.loading = false;
      }
    });
  }
}

