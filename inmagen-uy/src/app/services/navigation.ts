import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface PageNavigation {
  previous: { path: string; labelKey: string } | null;
  next: { path: string; labelKey: string } | null;
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private routes = [
    { path: '/', labelKey: 'nav.home' },
    { path: '/services', labelKey: 'nav.services' },
    { path: '/products', labelKey: 'nav.products' },
    { path: '/catering', labelKey: 'nav.catering' },
    { path: '/contact', labelKey: 'nav.contact' },
    { path: '/careers', labelKey: 'nav.careers' }
  ];

  constructor(private router: Router) {}

  getPageNavigation(currentPath: string): PageNavigation {
    const currentIndex = this.routes.findIndex(route => route.path === currentPath);
    
    if (currentIndex === -1) {
      return { previous: null, next: null };
    }

    const previous = currentIndex > 0 ? this.routes[currentIndex - 1] : null;
    const next = currentIndex < this.routes.length - 1 ? this.routes[currentIndex + 1] : null;

    return { previous, next };
  }

  navigateToPage(path: string): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.router.navigate([path]);
  }
}

