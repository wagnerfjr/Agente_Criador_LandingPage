/**
 * SEO Utilities - Meta tags, structured data, og:tags
 */
import content from '../content/lrfit.content.json';

export const setPageMeta = (config = {}) => {
  const defaults = {
    title: content.seo.title,
    description: content.seo.description,
    canonical: 'https://lrfitmethod.vercel.app',
    ogImage: content.seo.ogImage,
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
  name: content.brand.name,
  url: 'https://lrfitmethod.vercel.app',
  description: content.seo.description,
  sameAs: [
    `https://www.instagram.com/${content.trainers.renata.instagram}`,
    `https://www.instagram.com/${content.trainers.leandro.instagram}`,
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    areaServed: 'BR',
  },
};
