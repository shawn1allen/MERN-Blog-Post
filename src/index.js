import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-7kaj4sd1fklfb4ld.us.auth0.com"
    clientId="F7SjtNjsVb0VHNWhDWfX69ZryevhbD0Z"
    audience="https://blogpostapi.shawnallen.dev"
    scope="read:current_user"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>
)