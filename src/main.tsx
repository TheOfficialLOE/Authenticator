import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { CssVarsProvider } from "@mui/joy";
import App from "./App";


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CssVarsProvider>
      <App />
    </CssVarsProvider>
  </React.StrictMode>,
)
