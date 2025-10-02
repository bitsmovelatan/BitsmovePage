import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // ¡Asegúrate de que este import esté!

// --- DEFINICIÓN DE INTERFACES ---
export interface ProductoPedido {
  nombreProducto: string;
  cantidad: number;
  notas: string;
}

export interface PedidoEstructurado {
  items: ProductoPedido[];
}

@Injectable({
  providedIn: 'root'
})
export class PedidosGeminiService {

  // **IMPORTANTE: Usa una variable de entorno para la clave en producción.**
  private readonly GEMINI_API_KEY = 'TU_API_KEY_DE_GEMINI'; 
  private readonly GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

  constructor(private http: HttpClient) { }

  private getSystemPrompt(): string {
    return `
      Eres un asistente experto en pedidos de comida judía para un marketplace. 
      Tu única tarea es tomar el texto libre del usuario y convertirlo en un objeto JSON.
      
      Reglas estrictas:
      1. SÓLO debes responder con un JSON válido. NUNCA añadas explicaciones ni texto adicional.
      2. Si no puedes identificar el producto, usa "Desconocido" en nombreProducto y la nota original del usuario en 'notas'.
      
      Estructura JSON requerida:
      ${JSON.stringify({ items: [{ nombreProducto: 'string', cantidad: 'number', notas: 'string' }] }, null, 2)}
    `;
  }

  procesarPedido(textoPedido: string): Observable<PedidoEstructurado> {
    const systemPrompt = this.getSystemPrompt();
    
    const body = {
      contents: [
        { role: 'user', parts: [{ text: `${systemPrompt}\n\nPedido del cliente: ${textoPedido}` }] }
      ],
      config: {
        temperature: 0.1
      }
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.GEMINI_URL}?key=${this.GEMINI_API_KEY}`, body, { headers })
      .pipe(
        map(response => {
          const jsonString = response.candidates[0].content.parts[0].text.trim();
          
          try {
            const pedido = JSON.parse(jsonString) as PedidoEstructurado;
            return pedido;
          } catch (e) {
            console.error('Error al parsear el JSON de Gemini:', jsonString, e);
            throw new Error('El Asistente no pudo generar un pedido válido. Intenta nuevamente.');
          }
        })
      );
  }
}