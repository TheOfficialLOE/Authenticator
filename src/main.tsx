import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { CssVarsProvider as JoyUIProvider, extendTheme } from "@mui/joy";
import App from "./App";
import ModalProvider from "./ModalProvider";


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <JoyUIProvider
      // defaultMode="dark"
      theme={extendTheme({
        cssVarPrefix: 'joy',
        fontFamily: {
          body: "Roboto, var(--joy-fontFamily-fallback)",
          display: "Roboto, var(--joy-fontFamily-fallback)",
          fallback:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        },
      })}
      // colorSchemeSelector="#dark-mode-by-default"
      // modeStorageKey="dark-mode-by-default"
      disableNestedContext
    >
      <div id="dark-mode-by-default">
        <ModalProvider>
          <App/>
        </ModalProvider>
      </div>
    </JoyUIProvider>
  </React.StrictMode>,
)
