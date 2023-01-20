import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { CssVarsProvider as JoyUIProvider, extendTheme } from "@mui/joy";
import App from "./App";


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <JoyUIProvider
      defaultMode="dark"
      theme={extendTheme({cssVarPrefix: 'demo'})}
      colorSchemeSelector="#demo_dark-mode-by-default"
      modeStorageKey="demo_dark-mode-by-default"
      disableNestedContext
    >
      <div id="demo_dark-mode-by-default">
        <App/>
      </div>
    </JoyUIProvider>
  </React.StrictMode>,
)
