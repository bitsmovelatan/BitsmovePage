import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  name: string;
  price: string;
  quantity: number;
  imageUrl: string;
  glutenFree: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItems.asObservable();
  
  private cartCount = new BehaviorSubject<number>(0);
  public cartCount$ = this.cartCount.asObservable();

  constructor() {
    // Cargar carrito del localStorage si existe
    const savedCart = localStorage.getItem('inmagen_cart');
    if (savedCart) {
      const items = JSON.parse(savedCart);
      this.cartItems.next(items);
      this.updateCartCount();
    }
  }

  addToCart(product: any): void {
    console.log('CartService - Agregando producto:', product);
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(item => item.name === product.name);

    if (existingItem) {
      existingItem.quantity++;
      console.log('Producto existente, incrementando cantidad:', existingItem);
    } else {
      const newItem = {
        name: product.name,
        price: product.price || '$0',
        quantity: 1,
        imageUrl: product.imageUrl,
        glutenFree: product.glutenFree
      };
      currentItems.push(newItem);
      console.log('Producto nuevo agregado:', newItem);
    }

    this.cartItems.next([...currentItems]);
    this.saveCart();
    this.updateCartCount();
    console.log('Total items en carrito:', this.getCartCount());
  }

  removeFromCart(productName: string): void {
    const currentItems = this.cartItems.value.filter(item => item.name !== productName);
    this.cartItems.next(currentItems);
    this.saveCart();
    this.updateCartCount();
  }

  updateQuantity(productName: string, quantity: number): void {
    const currentItems = this.cartItems.value;
    const item = currentItems.find(i => i.name === productName);
    
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productName);
      } else {
        item.quantity = quantity;
        this.cartItems.next([...currentItems]);
        this.saveCart();
        this.updateCartCount();
      }
    }
  }

  clearCart(): void {
    this.cartItems.next([]);
    this.saveCart();
    this.updateCartCount();
  }

  getCartItems(): CartItem[] {
    return this.cartItems.value;
  }

  getCartCount(): number {
    return this.cartItems.value.reduce((total, item) => total + item.quantity, 0);
  }

  getCartTotal(): number {
    return this.cartItems.value.reduce((total, item) => {
      const price = parseInt(item.price.replace('$', ''));
      return total + (price * item.quantity);
    }, 0);
  }

  private updateCartCount(): void {
    this.cartCount.next(this.getCartCount());
  }

  private saveCart(): void {
    localStorage.setItem('inmagen_cart', JSON.stringify(this.cartItems.value));
  }
}