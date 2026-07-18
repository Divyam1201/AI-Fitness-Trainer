import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/react'
import dotenv from "dotenv"
import App from './App.tsx'

dotenv.config()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={process.env.CLERK_PUBLISHABLE_KEY!}>
    <App />
    </ClerkProvider>
  </StrictMode>,
)
