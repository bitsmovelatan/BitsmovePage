import React from 'react';
import { Auth0Provider as Auth0ProviderBase } from '@auth0/auth0-react';
import { auth0Config } from '../config/auth0';

interface Auth0ProviderProps {
  children: React.ReactNode;
}

export const Auth0Provider: React.FC<Auth0ProviderProps> = ({ children }) => {
  return (
    <Auth0ProviderBase
      domain={auth0Config.domain}
      clientId={auth0Config.clientId}
      authorizationParams={auth0Config.authorizationParams}
      useRefreshTokens={auth0Config.useRefreshTokens}
      cacheLocation={auth0Config.cacheLocation}
    >
      {children}
    </Auth0ProviderBase>
  );
};

export default Auth0Provider;
