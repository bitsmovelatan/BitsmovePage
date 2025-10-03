# 🔐 Configuración de Seguridad - API Keys

## ⚠️ IMPORTANTE: Protección de API Keys

**NUNCA** subas API keys a Git. Este proyecto ahora usa variables de entorno para proteger credenciales sensibles.

## 📁 Archivos de Entorno

### Desarrollo Local: `src/environments/environment.development.ts`
- ✅ Contiene tu API key real
- ❌ **NO se sube a Git** (está en .gitignore)
- 🔄 Debes crearlo localmente

### Producción: `src/environments/environment.ts`
- ✅ Se sube a Git
- ❌ NO contiene API keys reales
- 🌐 Usa variables de entorno de Vercel

## 🛠️ Configuración para Desarrollo Local

Ya está configurado automáticamente. El archivo `environment.development.ts` contiene tu API key.

## 🚀 Configuración para Producción en Vercel

### Opción A: Variables de Entorno en Vercel (Temporal)

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com)
2. Settings → Environment Variables
3. Agrega:
   - **Name:** `VITE_GEMINI_API_KEY`
   - **Value:** Tu API key
   - **Environment:** Production, Preview, Development

⚠️ **Limitación:** Las variables de entorno de Vercel se incluyen en el bundle del frontend, por lo que técnicamente son accesibles. **No es 100% seguro**.

### Opción B: Backend Proxy (Recomendado) 🌟

Para máxima seguridad, necesitas un backend que maneje las llamadas a Gemini.

#### Paso 1: Crear un Backend Simple (Node.js/Express)

Crea un archivo `api/gemini-proxy.js` en tu proyecto:

\`\`\`javascript
// api/gemini-proxy.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  
  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const response = await fetch(
      \`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=\${GEMINI_API_KEY}\`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body)
      }
    );

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
\`\`\`

#### Paso 2: Configurar en Vercel

1. Agrega el archivo `vercel.json`:

\`\`\`json
{
  "functions": {
    "api/gemini-proxy.js": {
      "maxDuration": 10
    }
  }
}
\`\`\`

2. Agrega la variable de entorno en Vercel:
   - **Name:** `GEMINI_API_KEY`
   - **Value:** Tu API key
   - **Environment:** Production

#### Paso 3: Actualizar el Servicio Angular

En `pedidos-gemini.service.ts`, cuando `USE_PROXY = true`:

\`\`\`typescript
procesarPedido(textoPedido: string): Observable<PedidoEstructurado> {
  const url = this.USE_PROXY 
    ? '/api/gemini-proxy'  // Backend proxy
    : \`\${this.GEMINI_URL}?key=\${this.GEMINI_API_KEY}\`;  // Directo (desarrollo)
  
  // ... resto del código
}
\`\`\`

## 🔒 Verificación de Seguridad

### ✅ Checklist antes de hacer push:

- [ ] El archivo `environment.development.ts` está en .gitignore
- [ ] El archivo `environment.ts` NO contiene API keys
- [ ] Las API keys solo están en variables de entorno de Vercel
- [ ] (Recomendado) Implementaste backend proxy

### 🔍 Revisar qué se va a subir:

\`\`\`bash
git status
git diff src/environments/environment.ts
\`\`\`

**IMPORTANTE:** Si ves tu API key en algún archivo que va a git, ¡NO hagas push!

## 🚨 Si Expusiste una API Key por Accidente

1. **Revoca inmediatamente** la API key en Google AI Studio
2. **Genera una nueva** API key
3. **Actualiza** tu configuración local y de Vercel
4. **Borra el historial** de Git si es necesario:
   \`\`\`bash
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch src/environments/environment.development.ts" \
     --prune-empty --tag-name-filter cat -- --all
   \`\`\`

## 📚 Recursos

- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Google AI Studio](https://makersuite.google.com/app/apikey)
- [Angular Environments](https://angular.dev/tools/cli/environments)

## 💡 Mejores Prácticas

1. **NUNCA** hardcodear API keys en el código
2. **SIEMPRE** usar variables de entorno
3. **PREFERIR** backend proxy para máxima seguridad
4. **ROTAR** las API keys regularmente
5. **MONITOREAR** el uso de las APIs

