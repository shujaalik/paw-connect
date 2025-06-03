import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from './components/ui/sonner.tsx'
import {
  BrowserRouter,
} from "react-router-dom";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme"> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <Toaster />
    {/* </ThemeProvider> */}
  </StrictMode >,
)
