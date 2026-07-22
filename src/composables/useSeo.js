import { useHead } from '@unhead/vue'

export const SITE_URL = 'https://zoomlocal.in'
export const SITE_NAME = 'ZoomLocal'

/** Default social share image (1200×630), used when a page doesn't set one. */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`
export const LOGO_URL = `${SITE_URL}/zoomlocal-logo.png`

/**
 * Central SEO/AEO head helper. Sets title, meta description, canonical,
 * Open Graph + Twitter cards, and optional JSON-LD structured data so the
 * page is fully readable by Google and AI answer engines.
 */
export function useSeo({ title, description, path = '/', image, type = 'website', jsonLd, keywords }) {
  const url = `${SITE_URL}${path}`
  const ogImage = image || DEFAULT_OG_IMAGE
  const head = {
    title,
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: type },
      { property: 'og:url', content: url },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:locale', content: 'en_IN' },
      { property: 'og:image', content: ogImage },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage },
    ],
    link: [{ rel: 'canonical', href: url }],
  }
  if (keywords) {
    head.meta.push({ name: 'keywords', content: keywords })
  }
  if (jsonLd) {
    const blocks = Array.isArray(jsonLd) ? jsonLd : [jsonLd]
    // NOTE: must be `innerHTML`, not `children` — @unhead/vue renders unknown
    // keys as attributes, which leaves the script body empty and makes the
    // structured data invisible to Google.
    head.script = blocks.map((obj) => ({
      type: 'application/ld+json',
      innerHTML: JSON.stringify(obj),
    }))
  }
  useHead(head)
}

/**
 * Organization schema, reused across pages. The stable @id lets every other
 * schema block (services, articles, breadcrumbs) reference the same entity,
 * which is what Google's knowledge graph and AI answer engines key on.
 */
export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'ZoomLocal',
  legalName: 'ZoomLocal Tech Private Limited',
  url: SITE_URL,
  logo: { '@type': 'ImageObject', url: LOGO_URL, width: 1080, height: 1080 },
  image: DEFAULT_OG_IMAGE,
  email: 'info@zoomlocal.in',
  telephone: '+91-92703-62196',
  address: { '@type': 'PostalAddress', addressCountry: 'IN' },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-92703-62196',
    email: 'info@zoomlocal.in',
    contactType: 'sales',
    availableLanguage: ['English', 'Hindi'],
  },
  knowsAbout: [
    'Local SEO',
    'Google Business Profile management',
    'Google Maps ranking',
    'Answer Engine Optimization (AEO)',
    'Generative Engine Optimization (GEO)',
    'Online review management',
    'Local search marketing',
  ],
  description:
    'ZoomLocal is a local growth agency. We offer Google Business Profile management (our core service), website development, Google Ads, and AEO/GEO AI search optimization for local businesses.',
}

/** BreadcrumbList schema from [{ name, path }] — include the current page last. */
export function breadcrumbLd(crumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  }
}

/** FAQPage schema from [{ q, a }]. */
export function faqLd(faq) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}
