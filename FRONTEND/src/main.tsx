import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import AppProvider from './context/AppContext.tsx'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </AppProvider>
  </QueryClientProvider>
)
