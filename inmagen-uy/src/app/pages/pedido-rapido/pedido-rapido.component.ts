import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PedidosGeminiService, PedidoEstructurado, ProductoPedido } from '../../services/gemini/pedidos-gemini.service';

@Component({
  selector: 'app-pedido-rapido',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pedido-rapido.component.html',
  styleUrls: ['./pedido-rapido.component.scss']
})
export class PedidoRapidoComponent {
  
  textoUsuario: string = '';
  pedidoProcesado: ProductoPedido[] | null = null;
  cargando: boolean = false;
  error: string | null = null;

  // Inyectamos el servicio que creamos
  constructor(private pedidosService: PedidosGeminiService) {}

  procesarTexto() {
    if (!this.textoUsuario.trim()) {
      this.error = 'Por favor, escribe tu pedido.';
      return;
    }
    
    this.cargando = true;
    this.error = null;
    this.pedidoProcesado = null;

    this.pedidosService.procesarPedido(this.textoUsuario)
      .subscribe({
        next: (data: PedidoEstructurado) => {
          this.pedidoProcesado = data.items;
          this.cargando = false;
          // **¡Aquí va la lógica de tu carrito!**
          // Ejemplo: this.carritoService.agregarItems(this.pedidoProcesado);
        },
        error: (err) => {
          this.error = err.message || 'Ocurrió un error al procesar tu pedido. Inténtalo más tarde.';
          this.cargando = false;
        }
      });
  }
}