import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sponsors-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sponsors-carousel.html',
  styleUrls: ['./sponsors-carousel.scss']
})
export class SponsorsCarouselComponent {
  // Logos de promotores - Puedes reemplazar con URLs reales o rutas a assets
  sponsors = [
    { name: 'Promotor 1', logo: 'https://via.placeholder.com/120x60/1a237e/ffffff?text=Promotor+1' },
    { name: 'Promotor 2', logo: 'https://via.placeholder.com/120x60/283593/ffffff?text=Promotor+2' },
    { name: 'Promotor 3', logo: 'https://via.placeholder.com/120x60/3949ab/ffffff?text=Promotor+3' },
    { name: 'Promotor 4', logo: 'https://via.placeholder.com/120x60/5c6bc0/ffffff?text=Promotor+4' },
    { name: 'Promotor 5', logo: 'https://via.placeholder.com/120x60/7986cb/ffffff?text=Promotor+5' },
    { name: 'Promotor 6', logo: 'https://via.placeholder.com/120x60/9fa8da/ffffff?text=Promotor+6' },
  ];

  // Duplicar sponsors para efecto infinito
  get infiniteSponsors() {
    return [...this.sponsors, ...this.sponsors, ...this.sponsors];
  }
}


