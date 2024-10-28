import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AI from './components/AI.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AI />
  </StrictMode>
);
