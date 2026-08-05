/**
 * SEO Utilities - Meta tags, structured data, og:tags
 */

export const setPageMeta = (config = {}) => {
  const defaults = {
    title: 'LR Fit Method - Transformação Fitness com Treino Inteligente',
    description: 'Método revolucionário de fitness que combina treinamento personalizado com análise de dados. Transforme seu corpo em 90 dias.',
    canonical: 'https://lrfitmethod.com',
    ogImage: 'https://placeholder.com/1200x630/D4AF37/1a1a1a?text=LR+Fit+Method',
    ogType: 'website',
    twitterCard: 'summary_large_image',
  };

  const meta = { ...defaults, ...config };

  // Title
  document.title = meta.title;
  updateOrCreateMeta('og:title', meta.title);
  updateOrCreateMeta('twitter:title', meta.title);

  // Description
  updateOrCreateMeta('description', meta.description);
  updateOrCreateMeta('og:description', meta.description);
  updateOrCreateMeta('twitter:description', meta.description);

  // Canonical
  if (meta.canonical) {
    updateOrCreateLink('canonical', meta.canonical);
    updateOrCreateMeta('og:url', meta.canonical);
  }

  // Images
  updateOrCreateMeta('og:image', meta.ogImage);
  updateOrCreateMeta('twitter:image', meta.ogImage);

  // Type
  updateOrCreateMeta('og:type', meta.ogType);
  updateOrCreateMeta('twitter:card', meta.twitterCard);

  // Additional
  updateOrCreateMeta('viewport', 'width=device-width, initial-scale=1.0');
  updateOrCreateMeta('theme-color', '#D4AF37');
};

const updateOrCreateMeta = (name, content) => {
  if (!content) return;

  const isProperty = name.startsWith('og:') || name.startsWith('twitter:');
  const attr = isProperty ? 'property' : 'name';

  let element = document.querySelector(`meta[${attr}="${name}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, name);
    document.head.appendChild(element);
  }

  element.content = content;
};

const updateOrCreateLink = (rel, href) => {
  let element = document.querySelector(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    document.head.appendChild(element);
  }

  element.href = href;
};

export const setStructuredData = (data) => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
};

// Organization schema
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'LR Fit Method',
  url: 'https://lrfitmethod.com',
  logo: 'https://lrfitmethod.com/logo.png',
  description: 'Método revolucionário de fitness com treinamento personalizado e análise de dados',
  sameAs: [
    'https://www.instagram.com/lrfitmethod',
    'https://www.facebook.com/lrfitmethod',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    areaServed: 'BR',
  },
};

// Local business schema (if applicable)
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'LR Fit Method',
  image: 'https://placeholder.com/1200x630/D4AF37/1a1a1a?text=LR+Fit+Method',
  url: 'https://lrfitmethod.com',
  priceRange: '$$',
};
