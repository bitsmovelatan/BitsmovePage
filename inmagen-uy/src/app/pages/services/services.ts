import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { TranslationService } from '../../services/translation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule
  ],
  templateUrl: './services.html',
  styleUrl: './services.scss'
})
export class ServicesComponent {
  services = [
    {
      key: 'orders',
      icon: 'receipt_long',
      color: '#667eea',
      gradient: ['#667eea', '#764ba2']
    },
    {
      key: 'counter',
      icon: 'storefront',
      color: '#10B981',
      gradient: ['#10B981', '#059669']
    },
    {
      key: 'catering',
      icon: 'event',
      color: '#F59E0B',
      gradient: ['#F59E0B', '#D97706']
    }
  ];

  processSteps = [
    { key: 'step1', icon: 'chat' },
    { key: 'step2', icon: 'assignment' },
    { key: 'step3', icon: 'construction' },
    { key: 'step4', icon: 'local_shipping' }
  ];

  constructor(
    public translate: TranslationService,
    private router: Router
  ) {}

  t(key: string): string {
    return this.translate.get(key);
  }

  getServiceFeatures(serviceKey: string): string[] {
    const features = this.translate.get(`services.${serviceKey}.features`);
    return Array.isArray(features) ? features : [];
  }

  contactUs(): void {
    this.router.navigate(['/contact']);
  }

  goToCatering(): void {
    this.router.navigate(['/catering']);
  }
}