import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { FiltetProvider } from './components/FilterContext.tsx'
import { ThemeProvider } from './components/ThemeContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <FiltetProvider>
        <App />
      </FiltetProvider>
    </ThemeProvider>
  </StrictMode>,
)
