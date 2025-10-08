import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Web3Service } from '../../services/web3.service';
import { AuthService } from '../../services/auth.service';
import { LanguageService } from '../../services/language.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-claim-tokens',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="claim-page">
      <div class="container">
        <div class="claim-card card">
          <div class="claim-icon">🎁</div>
          <h1>{{ t('dashboard.claimTokens') }}</h1>

          @if (error) {
            <div class="alert alert-error">{{ error }}</div>
          }
          @if (success) {
            <div class="alert alert-success">{{ success }}</div>
          }

          @if (!walletConnected) {
            <div class="claim-info">
              <p>Connect your wallet to claim your FertilityTokens</p>
              <p class="claim-amount">🪙 1000 FERT</p>
              <p class="info-text">
                You will receive 1000 FertilityTokens to help support your journey.
                These tokens are yours to keep and use within the platform.
              </p>
            </div>

            @if (!web3Available) {
              <div class="alert alert-warning">
                ⚠️ MetaMask or compatible wallet not detected. 
                Please install <a href="https://metamask.io" target="_blank">MetaMask</a> to continue.
              </div>
            }

            <button 
              (click)="connectWallet()" 
              class="btn btn-primary"
              [disabled]="loading || !web3Available"
            >
              @if (loading) {
                <span class="loading"></span>
              }
              Connect Wallet
            </button>
          } @else {
            <div class="wallet-info">
              <p>✓ Wallet Connected</p>
              <div class="wallet-address">{{ formatAddress(walletAddress) }}</div>
              
              @if (hasClaimed) {
                <div class="alert alert-success">
                  You have already claimed your tokens!
                </div>
              } @else {
                <p class="claim-amount">🪙 1000 FERT</p>
                <button 
                  (click)="claimTokens()" 
                  class="btn btn-primary"
                  [disabled]="loading"
                >
                  @if (loading) {
                    <span class="loading"></span>
                  }
                  Claim Tokens
                </button>
              }
            </div>
          }

          @if (transactionHash) {
            <div class="transaction-info">
              <p>✓ Transaction confirmed!</p>
              <a 
                [href]="'https://mumbai.polygonscan.com/tx/' + transactionHash" 
                target="_blank"
                class="transaction-link"
              >
                View on PolygonScan →
              </a>
            </div>
          }
        </div>

        <div class="instructions card">
          <h3>How it works</h3>
          <ol>
            <li>Connect your MetaMask or compatible Web3 wallet</li>
            <li>Make sure you're on the Polygon Mumbai testnet</li>
            <li>Click "Claim Tokens" to receive 1000 FERT tokens</li>
            <li>Confirm the transaction in your wallet</li>
            <li>Wait for the transaction to be confirmed</li>
          </ol>
          
          <p class="note">
            <strong>Note:</strong> You can only claim tokens once per account. 
            Make sure your wallet address is correct before claiming.
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .claim-page {
      padding: 3rem 0;
      min-height: calc(100vh - 300px);
    }

    .claim-card {
      max-width: 600px;
      margin: 0 auto 2rem;
      text-align: center;
    }

    .claim-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }

    .claim-card h1 {
      color: var(--primary-color);
      margin-bottom: 2rem;
    }

    .claim-info {
      margin: 2rem 0;
    }

    .claim-amount {
      font-size: 3rem;
      font-weight: 700;
      color: var(--primary-color);
      margin: 1.5rem 0;
    }

    .info-text {
      color: var(--text-secondary);
      line-height: 1.8;
      margin: 1rem 0;
    }

    .wallet-info {
      margin: 2rem 0;
    }

    .wallet-address {
      font-family: monospace;
      background: var(--bg-secondary);
      padding: 1rem;
      border-radius: 0.5rem;
      margin: 1rem 0;
      font-size: 1.125rem;
      word-break: break-all;
    }

    .transaction-info {
      margin-top: 2rem;
      padding: 1rem;
      background: var(--bg-secondary);
      border-radius: 0.5rem;
    }

    .transaction-link {
      display: inline-block;
      margin-top: 0.5rem;
      color: var(--primary-color);
      font-weight: 500;
    }

    .instructions {
      max-width: 600px;
      margin: 0 auto;
    }

    .instructions h3 {
      color: var(--primary-color);
      margin-bottom: 1rem;
    }

    .instructions ol {
      text-align: left;
      padding-left: 1.5rem;
      line-height: 2;
    }

    .instructions li {
      margin: 0.5rem 0;
    }

    .note {
      margin-top: 2rem;
      padding: 1rem;
      background: #fef3c7;
      border-left: 4px solid var(--warning-color);
      border-radius: 0.5rem;
      text-align: left;
    }
  `]
})
export class ClaimTokensComponent implements OnInit {
  walletConnected = false;
  walletAddress = '';
  hasClaimed = false;
  loading = false;
  error = '';
  success = '';
  transactionHash = '';
  web3Available = false;

  constructor(
    private web3Service: Web3Service,
    private authService: AuthService,
    private languageService: LanguageService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.web3Available = this.web3Service.isWalletAvailable();
    const user = this.authService.getCurrentUser();
    
    if (user?.tokensReceived && user.tokensReceived > 0) {
      this.hasClaimed = true;
      if (user.walletAddress) {
        this.walletConnected = true;
        this.walletAddress = user.walletAddress;
      }
    }
  }

  t = (key: string) => this.languageService.translate(key);

  async connectWallet() {
    this.loading = true;
    this.error = '';

    try {
      this.walletAddress = await this.web3Service.connectWallet();
      this.walletConnected = true;
      
      // Check if already claimed
      const claimed = await this.web3Service.hasClaimed(this.walletAddress);
      this.hasClaimed = claimed;
      
      this.loading = false;
    } catch (err: any) {
      this.error = err.message || 'Failed to connect wallet';
      this.loading = false;
    }
  }

  claimTokens() {
    this.loading = true;
    this.error = '';
    this.success = '';

    // Call backend to claim tokens
    this.http.post<any>(`${environment.apiUrl}/token/claim`, {
      walletAddress: this.walletAddress
    }).subscribe({
      next: (response) => {
        this.success = 'Tokens claimed successfully! 🎉';
        this.transactionHash = response.transactionHash;
        this.hasClaimed = true;
        
        // Update user data
        const user = this.authService.getCurrentUser();
        if (user) {
          user.walletAddress = this.walletAddress;
          user.tokensReceived = 1000;
          this.authService.updateUser(user);
        }
        
        this.loading = false;
        
        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 3000);
      },
      error: (err) => {
        this.error = err.error?.error || 'Failed to claim tokens. Please try again.';
        this.loading = false;
      }
    });
  }

  formatAddress(address: string): string {
    if (!address) return '';
    return `${address.substring(0, 10)}...${address.substring(address.length - 8)}`;
  }
}

