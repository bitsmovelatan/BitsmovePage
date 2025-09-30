import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CartService, CartItem } from '../../services/cart';
import { TranslationService } from '../../services/translation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartTotal: number = 0;

  constructor(
    public cartService: CartService,
    public translate: TranslationService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
    
    // Suscribirse a cambios en el carrito
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.cartTotal = this.cartService.getCartTotal();
    });
  }

  loadCart(): void {
    this.cartItems = this.cartService.getCartItems();
    this.cartTotal = this.cartService.getCartTotal();
  }

  t(key: string): string {
    return this.translate.get(key);
  }

  increaseQuantity(item: CartItem): void {
    this.cartService.updateQuantity(item.name, item.quantity + 1);
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.name, item.quantity - 1);
    } else {
      this.removeItem(item);
    }
  }

  removeItem(item: CartItem): void {
    this.cartService.removeFromCart(item.name);
    this.snackBar.open(
      `${item.name} eliminado del carrito`,
      'OK',
      { duration: 2000, panelClass: ['success-snackbar'] }
    );
  }

  clearCart(): void {
    if (confirm('¿Estás seguro de vaciar el carrito?')) {
      this.cartService.clearCart();
      this.snackBar.open(
        'Carrito vaciado',
        'OK',
        { duration: 2000, panelClass: ['success-snackbar'] }
      );
    }
  }

  getItemTotal(item: CartItem): number {
    const price = parseInt(item.price.replace('$', ''));
    return price * item.quantity;
  }

  proceedToCheckout(): void {
    this.snackBar.open(
      'Redirigiendo a WhatsApp para completar tu pedido...',
      'OK',
      { duration: 3000 }
    );
    
    // Crear mensaje para WhatsApp
    let message = 'Hola! Me gustaría hacer el siguiente pedido:\n\n';
    this.cartItems.forEach(item => {
      message += `- ${item.name} x${item.quantity} (${item.price} c/u = $${this.getItemTotal(item)})\n`;
    });
    message += `\nTotal: $${this.cartTotal}`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/598097619894?text=${encodedMessage}`, '_blank');
  }

  continueShopping(): void {
    this.router.navigate(['/products']);
  }
}