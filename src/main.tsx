import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { CssVarsProvider as JoyUIProvider, extendTheme } from "@mui/joy";
import App from "./App";


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <JoyUIProvider
      defaultMode="dark"
      theme={extendTheme({cssVarPrefix: ''})}
      colorSchemeSelector="#dark-mode-by-default"
      modeStorageKey="dark-mode-by-default"
      disableNestedContext
    >
      <div id="dark-mode-by-default">
        <App/>
      </div>
    </JoyUIProvider>
  </React.StrictMode>,
)
