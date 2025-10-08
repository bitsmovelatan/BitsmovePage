import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { LanguageService } from '../../services/language.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-page">
      <div class="container">
        <div class="dashboard-header">
          <h1>{{ t('dashboard.welcome') }}, {{ user?.name }}!</h1>
        </div>

        <div class="dashboard-grid">
          <!-- Token Info Card -->
          <div class="dashboard-card card">
            <div class="card-icon">🪙</div>
            <h3>{{ t('dashboard.tokens') }}</h3>
            <div class="token-amount">
              {{ user?.tokensReceived || 0 }} FERT
            </div>
            @if ((user?.tokensReceived || 0) === 0) {
              <a routerLink="/claim-tokens" class="btn btn-primary">
                {{ t('dashboard.claimTokens') }}
              </a>
            } @else {
              <p class="success-message">✓ Tokens claimed</p>
            }
          </div>

          <!-- Wallet Info Card -->
          <div class="dashboard-card card">
            <div class="card-icon">👛</div>
            <h3>Wallet Address</h3>
            @if (user?.walletAddress) {
              <div class="wallet-address">
                {{ formatAddress(user?.walletAddress || '') }}
              </div>
            } @else {
              <p class="info-message">Connect your wallet to claim tokens</p>
            }
          </div>

          <!-- Profile Card -->
          <div class="dashboard-card card">
            <div class="card-icon">👤</div>
            <h3>{{ t('dashboard.profile') }}</h3>
            <div class="profile-info">
              <p><strong>Email:</strong> {{ user?.email }}</p>
              <p><strong>Language:</strong> {{ user?.language === 'en' ? 'English' : 'Español' }}</p>
              <p><strong>Member since:</strong> {{ currentDate }}</p>
            </div>
          </div>

          <!-- Stories Card -->
          <div class="dashboard-card card">
            <div class="card-icon">📖</div>
            <h3>{{ t('dashboard.myStories') }}</h3>
            <div class="stories-count">
              {{ storiesCount }} stories shared
            </div>
            <a routerLink="/stories" class="btn btn-secondary">
              View Stories
            </a>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="quick-actions">
          <h2>Quick Actions</h2>
          <div class="actions-grid">
            <a routerLink="/stories" class="action-card card">
              <span class="action-icon">✍️</span>
              <span>Share Your Story</span>
            </a>
            <a routerLink="/claim-tokens" class="action-card card">
              <span class="action-icon">🎁</span>
              <span>Claim Tokens</span>
            </a>
            <a href="https://mumbai.polygonscan.com" target="_blank" class="action-card card">
              <span class="action-icon">🔍</span>
              <span>View on Explorer</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-page {
      padding: 3rem 0;
    }

    .dashboard-header {
      margin-bottom: 2rem;
    }

    .dashboard-header h1 {
      color: var(--primary-color);
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .dashboard-card {
      text-align: center;
      padding: 2rem;
    }

    .card-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .dashboard-card h3 {
      color: var(--text-primary);
      margin-bottom: 1rem;
    }

    .token-amount {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--primary-color);
      margin: 1rem 0;
    }

    .wallet-address {
      font-family: monospace;
      background: var(--bg-secondary);
      padding: 0.75rem;
      border-radius: 0.5rem;
      margin: 1rem 0;
      word-break: break-all;
    }

    .profile-info p {
      text-align: left;
      margin: 0.5rem 0;
      color: var(--text-secondary);
    }

    .profile-info strong {
      color: var(--text-primary);
    }

    .stories-count {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--primary-color);
      margin: 1rem 0;
    }

    .success-message {
      color: var(--success-color);
      font-weight: 500;
      margin-top: 1rem;
    }

    .info-message {
      color: var(--text-secondary);
      font-size: 0.875rem;
      margin-top: 1rem;
    }

    .quick-actions {
      margin-top: 3rem;
    }

    .quick-actions h2 {
      margin-bottom: 1.5rem;
    }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
    }

    .action-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding: 2rem;
      text-align: center;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .action-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
      color: var(--primary-color);
    }

    .action-icon {
      font-size: 2.5rem;
    }

    @media (max-width: 768px) {
      .dashboard-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  user: User | null = null;
  storiesCount = 0;
  currentDate: string = '';

  constructor(
    private authService: AuthService,
    private languageService: LanguageService,
    private http: HttpClient
  ) {
    this.currentDate = this.formatDate(new Date());
  }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    this.loadUserData();
  }

  t = (key: string) => this.languageService.translate(key);

  loadUserData() {
    // Load user stories count
    this.http.get<any>(`${environment.apiUrl}/user/profile`).subscribe({
      next: (response) => {
        if (response.user && response.user.stories) {
          this.storiesCount = response.user.stories.length;
        }
      },
      error: (err) => {
        console.error('Error loading user data:', err);
      }
    });
  }

  formatAddress(address: string): string {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString();
  }
}

