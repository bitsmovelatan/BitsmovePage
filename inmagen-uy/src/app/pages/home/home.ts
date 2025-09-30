import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslationService } from '../../services/translation';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class HomeComponent {
  features = [
    { icon: 'star', key: 'quality' },
    { icon: 'verified', key: 'tradition' },
    { icon: 'restaurant_menu', key: 'variety' },
    { icon: 'support_agent', key: 'service' }
  ];

  products = [
    { icon: '🍞', key: 'challah' },
    { icon: '🥐', key: 'rugelach' },
    { icon: '🍰', key: 'babka' },
    { icon: '🥯', key: 'bagels' }
  ];

  constructor(
    private router: Router,
    public translate: TranslationService
  ) {}

  startJourney(): void {
    this.router.navigate(['/services']);
  }

  t(key: string): string {
    return this.translate.get(key);
  }
}