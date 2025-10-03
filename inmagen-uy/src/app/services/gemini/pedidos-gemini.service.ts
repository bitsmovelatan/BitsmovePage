import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

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

  // La API key ahora viene de las variables de entorno
  private readonly GEMINI_API_KEY = environment.geminiApiKey; 
  private readonly GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
  private readonly USE_PROXY = environment.useProxy;

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
        { 
          parts: [
            { text: `${systemPrompt}\n\nPedido del cliente: ${textoPedido}` }
          ] 
        }
      ],
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 1000
      }
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.GEMINI_URL}?key=${this.GEMINI_API_KEY}`, body, { headers })
      .pipe(
        map(response => {
          console.log('Respuesta de Gemini:', response);
          
          if (!response.candidates || response.candidates.length === 0) {
            throw new Error('No se recibió respuesta válida de Gemini');
          }
          
          const jsonString = response.candidates[0].content.parts[0].text.trim();
          console.log('JSON recibido:', jsonString);
          
          // Limpiar el JSON si viene con markdown
          let cleanJson = jsonString;
          if (jsonString.startsWith('```json')) {
            cleanJson = jsonString.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
          } else if (jsonString.startsWith('```')) {
            cleanJson = jsonString.replace(/```\n?/g, '').trim();
          }
          
          try {
            const pedido = JSON.parse(cleanJson) as PedidoEstructurado;
            return pedido;
          } catch (e) {
            console.error('Error al parsear el JSON de Gemini:', cleanJson, e);
            throw new Error('El Asistente no pudo generar un pedido válido. Intenta nuevamente.');
          }
        })
      );
  }
}