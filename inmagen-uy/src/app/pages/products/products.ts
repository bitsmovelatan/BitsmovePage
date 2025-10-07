import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslationService } from '../../services/translation';
import { CartService } from '../../services/cart';
import { CatalogService, CatalogProduct } from '../../services/catalog.service';
import { PageNavigation } from '../../shared/page-navigation/page-navigation';

@Component({
  selector: 'app-products',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTabsModule,
    MatSnackBarModule,
    PageNavigation
  ],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class ProductsComponent implements OnInit {
  selectedCategory: string = 'all';
  selectedRegion: string = 'all';
  allProducts: CatalogProduct[] = [];

  categories = [
    { id: 'all', labelKey: 'products.categories.all', icon: 'apps' },
    { id: 'breads', labelKey: 'products.categories.breads', icon: 'bakery_dining' },
    { id: 'pastries', labelKey: 'products.categories.pastries', icon: 'cake' },
    { id: 'sweets', labelKey: 'products.categories.sweets', icon: 'cookie' },
    { id: 'main', labelKey: 'products.categories.main', icon: 'restaurant' }
  ];

  regions = [
    { id: 'all', labelKey: 'products.regions.all', icon: 'public', flag: '🌍' },
    { id: 'jewish', labelKey: 'products.regions.jewish', icon: 'star', flag: '✡️' },
    { id: 'uruguayan', labelKey: 'products.regions.uruguayan', icon: 'flag', flag: '🇺🇾' },
    { id: 'venezuelan', labelKey: 'products.regions.venezuelan', icon: 'flag', flag: '🇻🇪' },
    { id: 'mexican', labelKey: 'products.regions.mexican', icon: 'flag', flag: '🇲🇽' },
    { id: 'italian', labelKey: 'products.regions.italian', icon: 'flag', flag: '🇮🇹' }
  ];

  constructor(
    public translate: TranslationService,
    private cartService: CartService,
    private catalogService: CatalogService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.allProducts = this.catalogService.getAllProducts();
  }

  t(key: string): string {
    return this.translate.get(key);
  }

  filterProducts(category: string): void {
    this.selectedCategory = category;
  }

  filterByRegion(region: string): void {
    this.selectedRegion = region;
  }

  getFilteredProducts(): CatalogProduct[] {
    let filtered = this.allProducts;

    // Filtrar por región
    if (this.selectedRegion !== 'all') {
      filtered = filtered.filter(p => p.region === this.selectedRegion);
    }

    // Filtrar por categoría
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === this.selectedCategory);
    }

    return filtered;
  }

  getGlutenFreeCount(): number {
    return this.getFilteredProducts().filter(p => p.glutenFree).length;
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

  getRegionName(labelKey: string): string {
    return this.translate.get(labelKey);
  }

  addToCart(product: CatalogProduct): void {
    const productData = {
      name: this.getProductName(product.key),
      price: product.price,
      imageUrl: product.imageUrl,
      glutenFree: product.glutenFree
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