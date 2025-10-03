// Archivo de producción - se sube a Git (sin API keys)
export const environment = {
  production: true,
  geminiApiKey: '', // NUNCA pongas la key real aquí - usa variables de entorno de Vercel
  useProxy: true // En producción SIEMPRE usar backend proxy
};

