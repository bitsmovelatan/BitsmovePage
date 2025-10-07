import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PedidosGeminiService, PedidoEstructurado, ProductoPedido } from '../../services/gemini/pedidos-gemini.service';
import { CatalogService, CatalogProduct, ValidationResult } from '../../services/catalog.service';
import { CartService } from '../../services/cart';

export interface ValidatedProduct {
  original: ProductoPedido;
  validation: ValidationResult;
  addedToCart?: boolean;
}

@Component({
  selector: 'app-pedido-rapido',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    RouterLink,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule
  ],
  templateUrl: './pedido-rapido.component.html',
  styleUrls: ['./pedido-rapido.component.scss']
})
export class PedidoRapidoComponent {
  
  textoUsuario: string = '';
  productosValidados: ValidatedProduct[] = [];
  cargando: boolean = false;
  error: string | null = null;
  mostrarResultados: boolean = false;

  constructor(
    private pedidosService: PedidosGeminiService,
    private catalogService: CatalogService,
    private cartService: CartService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  procesarTexto() {
    if (!this.textoUsuario.trim()) {
      this.error = 'Por favor, escribe tu pedido.';
      return;
    }
    
    this.cargando = true;
    this.error = null;
    this.productosValidados = [];
    this.mostrarResultados = false;

    this.pedidosService.procesarPedido(this.textoUsuario)
      .subscribe({
        next: (data: PedidoEstructurado) => {
          // Validar cada producto contra el catálogo
          this.productosValidados = data.items.map(item => ({
            original: item,
            validation: this.catalogService.validateProduct(item.nombreProducto),
            addedToCart: false
          }));
          
          this.cargando = false;
          this.mostrarResultados = true;
          
          // Mostrar resumen
          const encontrados = this.productosValidados.filter(p => p.validation.found).length;
          const total = this.productosValidados.length;
          
          if (encontrados === total) {
            this.snackBar.open(
              `✅ ¡Todos los productos fueron identificados! (${total})`,
              'OK',
              { duration: 3000, panelClass: ['success-snackbar'] }
            );
          } else {
            this.snackBar.open(
              `⚠️ ${encontrados} de ${total} productos identificados. Revisa las sugerencias.`,
              'OK',
              { duration: 4000, panelClass: ['warning-snackbar'] }
            );
          }
        },
        error: (err) => {
          this.error = err.message || 'Ocurrió un error al procesar tu pedido. Inténtalo más tarde.';
          this.cargando = false;
        }
      });
  }

  agregarAlCarrito(validatedProduct: ValidatedProduct) {
    if (!validatedProduct.validation.found || !validatedProduct.validation.product) {
      this.snackBar.open(
        '❌ No se puede agregar un producto no identificado',
        'OK',
        { duration: 2000, panelClass: ['error-snackbar'] }
      );
      return;
    }

    const catalogProduct = validatedProduct.validation.product;
    const quantity = validatedProduct.original.cantidad;

    // Agregar al carrito la cantidad especificada
    for (let i = 0; i < quantity; i++) {
      this.cartService.addToCart({
        name: catalogProduct.name,
        price: catalogProduct.price,
        imageUrl: catalogProduct.imageUrl,
        glutenFree: catalogProduct.glutenFree
      });
    }

    validatedProduct.addedToCart = true;

    this.snackBar.open(
      `✅ ${quantity}x ${catalogProduct.name} agregado al carrito`,
      'VER CARRITO',
      { 
        duration: 3000,
        panelClass: ['success-snackbar']
      }
    ).onAction().subscribe(() => {
      this.router.navigate(['/cart']);
    });
  }

  agregarTodosAlCarrito() {
    const productosValidos = this.productosValidados.filter(p => p.validation.found && !p.addedToCart);
    
    if (productosValidos.length === 0) {
      this.snackBar.open(
        'No hay productos válidos para agregar',
        'OK',
        { duration: 2000 }
      );
      return;
    }

    let totalItems = 0;
    productosValidos.forEach(vp => {
      if (vp.validation.product) {
        const quantity = vp.original.cantidad;
        for (let i = 0; i < quantity; i++) {
          this.cartService.addToCart({
            name: vp.validation.product.name,
            price: vp.validation.product.price,
            imageUrl: vp.validation.product.imageUrl,
            glutenFree: vp.validation.product.glutenFree
          });
        }
        vp.addedToCart = true;
        totalItems += quantity;
      }
    });

    this.snackBar.open(
      `✅ ${totalItems} productos agregados al carrito`,
      'VER CARRITO',
      { 
        duration: 4000,
        panelClass: ['success-snackbar']
      }
    ).onAction().subscribe(() => {
      this.router.navigate(['/cart']);
    });
  }

  usarSugerencia(validatedProduct: ValidatedProduct, suggestion: CatalogProduct) {
    validatedProduct.validation = {
      found: true,
      product: suggestion,
      similarity: 1.0
    };
    
    this.snackBar.open(
      `Producto cambiado a: ${suggestion.name}`,
      'OK',
      { duration: 2000 }
    );
  }

  nuevoPedido() {
    this.textoUsuario = '';
    this.productosValidados = [];
    this.mostrarResultados = false;
    this.error = null;
  }

  getSimilarityClass(similarity?: number): string {
    if (!similarity) return 'low';
    if (similarity >= 0.9) return 'high';
    if (similarity >= 0.7) return 'medium';
    return 'low';
  }

  getSimilarityIcon(similarity?: number): string {
    if (!similarity) return 'help_outline';
    if (similarity >= 0.9) return 'check_circle';
    if (similarity >= 0.7) return 'warning';
    return 'error_outline';
  }

  hasValidProductsToAdd(): boolean {
    return this.productosValidados.some(p => p.validation.found && !p.addedToCart);
  }

  getRegionDisplay(region: string): string {
    const regionMap: Record<string, string> = {
      'jewish': '🕎 Judía',
      'uruguayan': '🇺🇾 Uruguaya',
      'venezuelan': '🇻🇪 Venezolana',
      'mexican': '🇲🇽 Mexicana',
      'italian': '🇮🇹 Italiana'
    };
    return regionMap[region] || region;
  }
}