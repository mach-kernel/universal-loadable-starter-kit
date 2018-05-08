// Bootstrapping
import React from 'react';
import ReactDOM from 'react-dom';
import BrowserRouter from 'react-router-dom/es/BrowserRouter';
import { CookiesProvider } from 'react-cookie';
import Loadable from 'react-loadable';

import App from './LoadableApp';

const frame = (
  <CookiesProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CookiesProvider>
);

if (process.env.CLIENT) {
  Loadable.preloadReady()
          .then(() => ReactDOM.hydrate(frame, document.getElementById('root')))
}

// HMR
if (module.hot) {
  module.hot.accept();
  Loadable.preloadReady()
          .then(() => ReactDOM.hydrate(frame, document.getElementById('root')))
}