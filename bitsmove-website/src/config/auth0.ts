// Auth0 Configuration
export const auth0Config = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN || 'genai-6844550283068684.au.auth0.com',
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID || 'hVLyaEWnSMC9TcaN2dHS6byluT7RPieb',
  authorizationParams: {
    redirect_uri: window.location.origin,
    audience: process.env.REACT_APP_AUTH0_AUDIENCE || 'https://genai-6844550283068684.au.auth0.com/api/v2/',
    scope: 'openid profile email'
  },
  useRefreshTokens: true,
  cacheLocation: 'localstorage' as const
};

export default auth0Config;
