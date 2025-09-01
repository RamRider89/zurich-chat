import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "../node_modules/bootstrap/scss/bootstrap.scss";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.scss"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
        <App />
  </StrictMode>
);