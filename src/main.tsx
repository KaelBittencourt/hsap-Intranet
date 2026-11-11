import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Entrada do React: conecta App ao elemento root do index.html e carrega os estilos globais.
// StrictMode executa verificações extras no desenvolvimento; efeitos precisam limpar timers e eventos.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
