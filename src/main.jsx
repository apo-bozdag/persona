import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import PersonaBuilder from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PersonaBuilder />
  </StrictMode>
);