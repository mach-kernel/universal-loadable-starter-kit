import React from 'react';
import ReactDOM from 'react-dom/server';
import App from '../client/LoadableApp';

import Loadable from 'react-loadable';
import loadableStats from '../../dist/client/react-loadable.json';

import { getBundles } from 'react-loadable/webpack';
import { StaticRouter } from 'react-router-dom';

import { CookiesProvider } from 'react-cookie';

/**
 * Create tags for the bundles
 * @param bundles 
 */
const mapBundles = (bundles) => bundles.map((bundle) => {
  let url = `/static/${bundle.file}`

  return bundle.file.endsWith('.js') ? `<script src="${url}" defer></script>`
                                     : `<link rel="stylesheet" href="${url}"></link>`;
});

const performSSR = () => (req, res, next) => {
  let modules = [];

  let reactString = ReactDOM.renderToString(
    <CookiesProvider cookies={req.universalCookies}>
      <StaticRouter location={req.url} context={{}}>
        <Loadable.Capture report={(m) => modules.push(m)}>
          <App />
        </Loadable.Capture>
      </StaticRouter>
    </CookiesProvider>
  );
  
  let bundles = getBundles(loadableStats, modules);

  let html = `
    <html>
      <head>
        ${mapBundles(bundles).join('\n')}
      </head>
      <div id="root">${reactString}</div>
      <script src="/static/main.bundle.js"></script>
    </html>`
  res.send(html);
}

export default performSSR;