# 🔑 Configuración de Google Gemini API

## Paso 1: Obtener tu API Key

1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Inicia sesión con tu cuenta de Google
3. Haz clic en **"Create API Key"** o **"Get API Key"**
4. Copia la clave generada (empieza con `AIza...`)

## Paso 2: Configurar la API Key en el Proyecto

### Opción A: Desarrollo Local (Rápido)

Edita el archivo: `src/app/services/gemini/pedidos-gemini.service.ts`

Busca la línea 24 y reemplaza la clave de ejemplo:

```typescript
private readonly GEMINI_API_KEY = 'TU_CLAVE_REAL_AQUI';
```

**⚠️ ADVERTENCIA:** NO subas este archivo a Git con tu clave real.

### Opción B: Variables de Entorno (Recomendado para Producción)

Para producción en Vercel:

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com)
2. Settings → Environment Variables
3. Agrega una nueva variable:
   - **Name:** `GEMINI_API_KEY`
   - **Value:** Tu API key real
   - **Environment:** Production, Preview, Development

Luego actualiza el servicio para usar variables de entorno.

## Paso 3: Verificar que Funciona

1. Guarda el archivo con tu API key
2. Recarga la aplicación en `http://localhost:4200/pedido-gemini`
3. Prueba escribiendo: "quiero dos knishes y un brownie"
4. Haz clic en "Procesar Pedido con IA"

Si todo funciona correctamente, verás los productos identificados y validados.

## Modelos Disponibles

- `gemini-1.5-flash` - Rápido y eficiente (recomendado)
- `gemini-1.5-pro` - Más potente pero más lento
- `gemini-1.0-pro` - Versión anterior

## Límites de Uso Gratuito

- **60 requests por minuto**
- **1,500 requests por día**
- Más que suficiente para desarrollo y testing

## Solución de Problemas

### Error 400: Invalid API Key
- Verifica que copiaste la clave completa
- Asegúrate de que no hay espacios al inicio o final
- Confirma que la API está habilitada en Google Cloud Console

### Error 429: Rate Limit
- Has excedido el límite de requests
- Espera un minuto antes de volver a intentar

### Error 403: Permission Denied
- Verifica que la API Key tenga permisos para Gemini API
- Revisa en Google Cloud Console que el servicio esté habilitado

## Recursos

- [Documentación Gemini API](https://ai.google.dev/docs)
- [Precios y Límites](https://ai.google.dev/pricing)
- [Google AI Studio](https://makersuite.google.com/)



