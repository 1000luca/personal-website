/**
 * SEO Utilities
 * Helper functions for SEO optimization
 */

interface MetaTags {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: 'summary' | 'summary_large_image';
}

/**
 * Updates the document title
 */
export const updateTitle = (title: string, suffix = 'Portfolio'): void => {
  document.title = `${title} | ${suffix}`;
};

/**
 * Updates meta tags dynamically
 */
export const updateMetaTags = (tags: MetaTags): void => {
  // Update title
  if (tags.title) {
    updateTitle(tags.title);
  }

  // Update description
  if (tags.description) {
    updateMetaTag('description', tags.description);
  }

  // Update keywords
  if (tags.keywords) {
    updateMetaTag('keywords', tags.keywords);
  }

  // Update Open Graph tags
  if (tags.ogImage) {
    updateMetaTag('og:image', tags.ogImage, 'property');
  }
  if (tags.ogUrl) {
    updateMetaTag('og:url', tags.ogUrl, 'property');
  }
  if (tags.title) {
    updateMetaTag('og:title', tags.title, 'property');
  }
  if (tags.description) {
    updateMetaTag('og:description', tags.description, 'property');
  }

  // Update Twitter Card tags
  if (tags.twitterCard) {
    updateMetaTag('twitter:card', tags.twitterCard);
  }
  if (tags.title) {
    updateMetaTag('twitter:title', tags.title);
  }
  if (tags.description) {
    updateMetaTag('twitter:description', tags.description);
  }
  if (tags.ogImage) {
    updateMetaTag('twitter:image', tags.ogImage);
  }
};

/**
 * Helper function to update a single meta tag
 */
const updateMetaTag = (
  name: string,
  content: string,
  attribute: 'name' | 'property' = 'name'
): void => {
  let element = document.querySelector(`meta[${attribute}="${name}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
};

/**
 * Generates structured data (JSON-LD) for a person
 */
export const generatePersonSchema = (data: {
  name: string;
  jobTitle: string;
  url: string;
  email: string;
  location: string;
  sameAs: string[]; // Social media URLs
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: data.name,
    jobTitle: data.jobTitle,
    url: data.url,
    email: data.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: data.location,
    },
    sameAs: data.sameAs,
  };
};

/**
 * Injects structured data into the page
 */
export const injectStructuredData = (data: Record<string, unknown>): void => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(data);
  document.head.appendChild(script);
};

/**
 * Default meta tags for the portfolio
 */
export const defaultMetaTags: MetaTags = {
  title: 'Cheon - Full Stack Developer',
  description:
    'Portfolio of Cheon, a Full Stack Developer specializing in React, TypeScript, Node.js, and modern web technologies.',
  keywords:
    'Full Stack Developer, React, TypeScript, Node.js, Web Development, Portfolio, Software Engineer',
  ogImage: '/og-image.jpg',
  ogUrl: 'https://example.com',
  twitterCard: 'summary_large_image',
};
