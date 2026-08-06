/**
 * Enhanced SEO utilities for canonical URLs, structured data, and meta tags
 */

export const setSEOCanonical = (url = window.location.href) => {
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = url;
};

export const setSEOStructuredData = (type, data) => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  });
  document.head.appendChild(script);
};

export const setSEOBreadcrumbs = (items) => {
  setSEOStructuredData('BreadcrumbList', {
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: `${window.location.origin}${item.url}`,
    })),
  });
};

export const setSEOArticle = ({ headline, description, image, datePublished, author }) => {
  setSEOStructuredData('Article', {
    headline,
    description,
    image,
    datePublished,
    author: {
      '@type': 'Organization',
      name: author || 'LR Fit Method',
    },
  });
};

export const setSEOProduct = ({ name, description, price, rating, availability }) => {
  setSEOStructuredData('Product', {
    name,
    description,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating || '4.9',
      ratingCount: '500',
    },
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: 'BRL',
      availability: availability || 'https://schema.org/InStock',
    },
  });
};

export const setSEOFAQ = (questions) => {
  setSEOStructuredData('FAQPage', {
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  });
};

export const generateSitemapIndexEntry = (url, lastmod = new Date().toISOString().split('T')[0]) => ({
  url,
  lastmod,
  changefreq: 'weekly',
  priority: '0.8',
});

export const validateSEO = () => {
  const issues = [];

  // Check meta description
  const description = document.querySelector('meta[name="description"]');
  if (!description || description.content.length < 50) {
    issues.push('⚠️  Meta description too short (min 50 chars)');
  }
  if (description && description.content.length > 160) {
    issues.push('⚠️  Meta description too long (max 160 chars)');
  }

  // Check title
  const title = document.title;
  if (title.length < 30) {
    issues.push('⚠️  Title too short (min 30 chars)');
  }
  if (title.length > 60) {
    issues.push('⚠️  Title too long (max 60 chars)');
  }

  // Check canonical
  const canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    issues.push('⚠️  Missing canonical URL');
  }

  // Check OG tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogImage = document.querySelector('meta[property="og:image"]');
  if (!ogTitle || !ogImage) {
    issues.push('⚠️  Missing Open Graph tags');
  }

  // Check structured data
  const structuredData = document.querySelector('script[type="application/ld+json"]');
  if (!structuredData) {
    issues.push('⚠️  Missing structured data (JSON-LD)');
  }

  // Check headings
  const h1s = document.querySelectorAll('h1');
  if (h1s.length !== 1) {
    issues.push(`⚠️  Should have exactly 1 H1, found ${h1s.length}`);
  }

  // Check images alt text
  const images = document.querySelectorAll('img:not([alt])');
  if (images.length > 0) {
    issues.push(`⚠️  ${images.length} images missing alt text`);
  }

  return {
    status: issues.length === 0 ? 'PASS' : 'WARN',
    issues,
    score: Math.max(0, 100 - issues.length * 10),
  };
};

export default {
  setSEOCanonical,
  setSEOStructuredData,
  setSEOBreadcrumbs,
  setSEOArticle,
  setSEOProduct,
  setSEOFAQ,
  generateSitemapIndexEntry,
  validateSEO,
};
