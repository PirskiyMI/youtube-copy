import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/index.tsx';
import './app/firebase/index.ts';

createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      <App />
   </React.StrictMode>,
);
