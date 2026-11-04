import React from 'react';
import ReactDOM from 'react-dom/client';
import { registerRemotes } from '@module-federation/enhanced/runtime';
import App from './App';

registerRemotes([
  {
    name: 'utils',
    entry: 'http://localhost:3003/mf-manifest.json',
  },
]);

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
