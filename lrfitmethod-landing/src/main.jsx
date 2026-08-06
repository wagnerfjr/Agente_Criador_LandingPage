import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { setPageMeta, organizationSchema, setStructuredData } from './utils/seo'

// Initialize SEO
setPageMeta()
setStructuredData(organizationSchema)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
