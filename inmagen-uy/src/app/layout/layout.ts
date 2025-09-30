import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { TranslationService } from '../services/translation';
import { CartService } from '../services/cart';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss'],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatBadgeModule
  ]
})
export class LayoutComponent {
  currentLang: string = 'es';
  sidenavOpened: boolean = true;
  cartCount: number = 0;
  
  menuItems = [
    { path: '/', icon: 'home', labelKey: 'nav.home' },
    { path: '/services', icon: 'business_center', labelKey: 'nav.services' },
    { path: '/products', icon: 'restaurant', labelKey: 'nav.products' },
    { path: '/catering', icon: 'event', labelKey: 'nav.catering' },
    { path: '/contact', icon: 'contact_mail', labelKey: 'nav.contact' },
    { path: '/careers', icon: 'work', labelKey: 'nav.careers' }
  ];

  languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' }
  ];

  constructor(
    public translate: TranslationService,
    public cartService: CartService
  ) {
    this.currentLang = translate.getCurrentLanguage();
    
    // Suscribirse al contador del carrito
    this.cartService.cartCount$.subscribe(count => {
      console.log('Carrito actualizado. Nuevo contador:', count);
      this.cartCount = count;
    });
    
    console.log('Layout inicializado. Carrito actual:', this.cartService.getCartCount());
  }

  toggleSidenav(): void {
    this.sidenavOpened = !this.sidenavOpened;
  }

  changeLanguage(lang: string): void {
    this.currentLang = lang;
    this.translate.setLanguage(lang);
  }

  getCurrentLanguage(): string {
    const lang = this.languages.find(l => l.code === this.currentLang);
    return lang ? `${lang.flag} ${lang.name}` : 'Español';
  }

  t(key: string): string {
    return this.translate.get(key);
  }

  getMenuLabel(labelKey: string): string {
    return this.translate.get(labelKey);
  }
}