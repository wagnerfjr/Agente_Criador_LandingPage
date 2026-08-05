import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { setPageMeta, organizationSchema, setStructuredData } from './utils/seo'

// Initialize SEO
setPageMeta()
setStructuredData(organizationSchema)

// Register Meta Pixel
if (import.meta.env.VITE_META_PIXEL_ID) {
  window.fbq('init', import.meta.env.VITE_META_PIXEL_ID);
  window.fbq('track', 'PageView');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
