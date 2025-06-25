import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import EraView from './EraView.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EraView />
  </StrictMode>
);
