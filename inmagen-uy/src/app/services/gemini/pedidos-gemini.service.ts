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
  private readonly GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
  private readonly USE_PROXY = environment.useProxy;

  constructor(private http: HttpClient) { }

  private getSystemPrompt(): string {
    return `
      Eres un asistente experto en pedidos de comida judía para un marketplace. 
      Tu única tarea es tomar el texto libre del usuario y convertirlo en un objeto JSON.
      
      Reglas estrictas:
      1. SÓLO debes responder con un JSON válido. NUNCA añadas explicaciones, markdown ni texto adicional.
      2. NO uses bloques de código markdown (sin \`\`\`json ni \`\`\`).
      3. Si no puedes identificar el producto, usa "Desconocido" en nombreProducto y la nota original del usuario en 'notas'.
      4. Si el usuario menciona "para X personas", multiplica la cantidad de cada producto por ese número.
      5. La cantidad SIEMPRE debe ser un número entero (1, 2, 3, etc.), nunca un string.
      6. Las notas pueden estar vacías ("") si no hay especificaciones.
      
      Productos conocidos: knish, brownie, galletas, cookies, masita, pionono, pletzalaj, rol de canela, strudel, tarta de manzana, trigona de puerro
      
      Estructura JSON requerida (responde SOLO esto, sin nada más):
      ${JSON.stringify({ items: [{ nombreProducto: 'knish', cantidad: 2, notas: '' }] }, null, 2)}
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
          console.log('Respuesta completa de Gemini:', response);
          
          // Validar estructura de respuesta
          if (!response || typeof response !== 'object') {
            console.error('Respuesta inválida:', response);
            throw new Error('Respuesta inválida del servidor');
          }
          
          if (!response.candidates || !Array.isArray(response.candidates) || response.candidates.length === 0) {
            console.error('No hay candidates en la respuesta:', response);
            throw new Error('No se recibió respuesta válida de Gemini');
          }
          
          const candidate = response.candidates[0];
          if (!candidate.content || !candidate.content.parts || !Array.isArray(candidate.content.parts) || candidate.content.parts.length === 0) {
            console.error('Estructura de candidate inválida:', candidate);
            throw new Error('Estructura de respuesta inválida');
          }
          
          const jsonString = candidate.content.parts[0].text.trim();
          console.log('Texto recibido:', jsonString);
          
          // Limpiar el JSON si viene con markdown o texto adicional
          let cleanJson = jsonString;
          
          // Eliminar bloques de código markdown
          if (cleanJson.includes('```')) {
            cleanJson = cleanJson.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
          }
          
          // Si hay texto antes del JSON, intentar extraer solo el JSON
          const jsonMatch = cleanJson.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            cleanJson = jsonMatch[0];
          }
          
          console.log('JSON limpio:', cleanJson);
          
          try {
            const pedido = JSON.parse(cleanJson) as PedidoEstructurado;
            
            // Validar estructura del pedido
            if (!pedido.items || !Array.isArray(pedido.items)) {
              throw new Error('El pedido no tiene la estructura correcta');
            }
            
            // Asegurar que las cantidades sean números
            pedido.items = pedido.items.map((item: any) => ({
              nombreProducto: item.nombreProducto || 'Desconocido',
              cantidad: typeof item.cantidad === 'number' ? item.cantidad : parseInt(String(item.cantidad) || '1'),
              notas: item.notas || ''
            }));
            
            console.log('Pedido procesado:', pedido);
            return pedido;
          } catch (e) {
            console.error('Error al parsear el JSON:', cleanJson, e);
            throw new Error('El Asistente no pudo generar un pedido válido. Intenta nuevamente.');
          }
        })
      );
  }
}