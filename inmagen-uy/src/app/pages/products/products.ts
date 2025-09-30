import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslationService } from '../../services/translation';
import { CartService } from '../../services/cart';

interface Product {
  name: string;
  description: string;
  glutenFree: boolean;
  imageUrl: string;
  category: string;
  price?: string;
  features?: string[];
}

@Component({
  selector: 'app-products',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTabsModule,
    MatSnackBarModule
  ],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class ProductsComponent {
  selectedCategory: string = 'all';
  
  productKeys = [
    {
      key: 'challah',
      glutenFree: false,
      imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
      category: 'breads',
      price: '$450'
    },
    {
      key: 'bagels',
      glutenFree: true,
      imageUrl: 'https://images.unsplash.com/photo-1551106652-a5bcf4b29e84?w=800&q=80',
      category: 'breads',
      price: '$380'
    },
    {
      key: 'rugelach',
      glutenFree: false,
      imageUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80',
      category: 'sweets',
      price: '$520'
    },
    {
      key: 'babka',
      glutenFree: false,
      imageUrl: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&q=80',
      category: 'pastries',
      price: '$680'
    },
    {
      key: 'hamentashen',
      glutenFree: false,
      imageUrl: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80',
      category: 'sweets',
      price: '$420'
    },
    {
      key: 'knish',
      glutenFree: true,
      imageUrl: 'https://images.unsplash.com/photo-1568471173248-eb9aba2f5e77?w=800&q=80',
      category: 'pastries',
      price: '$350'
    },
    {
      key: 'strudel',
      glutenFree: true,
      imageUrl: 'https://images.unsplash.com/photo-1587241321921-91a834d6d191?w=800&q=80',
      category: 'pastries',
      price: '$590'
    },
    {
      key: 'brownie',
      glutenFree: true,
      imageUrl: 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?w=800&q=80',
      category: 'sweets',
      price: '$380'
    },
    {
      key: 'tarta',
      glutenFree: true,
      imageUrl: 'https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=800&q=80',
      category: 'pastries',
      price: '$750'
    }
  ];

  categories = [
    { id: 'all', labelKey: 'products.categories.all', icon: 'apps' },
    { id: 'breads', labelKey: 'products.categories.breads', icon: 'bakery_dining' },
    { id: 'pastries', labelKey: 'products.categories.pastries', icon: 'cake' },
    { id: 'sweets', labelKey: 'products.categories.sweets', icon: 'cookie' }
  ];

  constructor(
    public translate: TranslationService,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  t(key: string): string {
    return this.translate.get(key);
  }

  filterProducts(category: string): void {
    this.selectedCategory = category;
  }

  getFilteredProducts(): any[] {
    if (this.selectedCategory === 'all') {
      return this.productKeys;
    }
    return this.productKeys.filter(p => p.category === this.selectedCategory);
  }

  getGlutenFreeCount(): number {
    return this.productKeys.filter(p => p.glutenFree).length;
  }

  getProductName(key: string): string {
    return this.translate.get(`products.items.${key}.name`);
  }

  getProductDescription(key: string): string {
    return this.translate.get(`products.items.${key}.description`);
  }

  getProductFeatures(key: string): string[] {
    const features = this.translate.get(`products.items.${key}.features`);
    return typeof features === 'string' ? [] : features;
  }

  getCategoryName(labelKey: string): string {
    return this.translate.get(labelKey);
  }

  addToCart(productKey: any): void {
    const productData = {
      name: this.getProductName(productKey.key),
      price: productKey.price,
      imageUrl: productKey.imageUrl,
      glutenFree: productKey.glutenFree
    };
    
    console.log('Agregando al carrito:', productData);
    this.cartService.addToCart(productData);
    
    const message = `${productData.name} ${this.translate.get('products.addedToCart')}`;
    const action = this.translate.get('products.viewCart');
    
    console.log('Mensaje snackbar:', message);
    
    this.snackBar.open(
      message,
      action,
      { 
        duration: 3000,
        panelClass: ['success-snackbar'],
        horizontalPosition: 'end',
        verticalPosition: 'top'
      }
    );
  }
}