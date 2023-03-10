import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { CssVarsProvider as JoyUIProvider, extendTheme } from "@mui/joy";
import App from "./App";
import ModalProvider from "./ModalProvider";
import MyToastContainer from "./components/MyToastContainer";


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
      <div>
        <ModalProvider>
          <App/>
        </ModalProvider>
      </div>
    </JoyUIProvider>
    <MyToastContainer />
  </React.StrictMode>,
)
