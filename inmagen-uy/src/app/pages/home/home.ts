import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class HomeComponent implements OnInit, OnDestroy {
  currentSlide = 0;
  autoplayInterval: any;
  
  carouselProducts = [
    {
      key: 'brownie',
      imageUrl: 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?w=1200&q=80',
      price: '$990'
    },
    {
      key: 'cookies',
      imageUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=1200&q=80',
      price: '$40'
    },
    {
      key: 'strudel',
      imageUrl: 'https://images.unsplash.com/photo-1587241321921-91a834d6d191?w=1200&q=80',
      price: '$650'
    },
    {
      key: 'tarta_manzana',
      imageUrl: 'https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=1200&q=80',
      price: '$650'
    },
    {
      key: 'pionono',
      imageUrl: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1200&q=80',
      price: '$990'
    },
    {
      key: 'pletzalaj',
      imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&q=80',
      price: '$25'
    }
  ];

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

  ngOnInit(): void {
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  startAutoplay(): void {
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Cambiar cada 5 segundos
  }

  stopAutoplay(): void {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }

  nextSlide(): void {
    if (this.currentSlide < this.carouselProducts.length - 1) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0; // Volver al inicio
    }
  }

  previousSlide(): void {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    } else {
      this.currentSlide = this.carouselProducts.length - 1; // Ir al final
    }
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    this.stopAutoplay();
    this.startAutoplay(); // Reiniciar el autoplay
  }

  getProductName(key: string): string {
    return this.translate.get(`products.items.${key}.name`);
  }

  startJourney(): void {
    this.router.navigate(['/services']);
  }

  t(key: string): string {
    return this.translate.get(key);
  }
}