import { useHead } from '@unhead/vue'

export const SITE_URL = 'https://zoomlocal.in'
export const SITE_NAME = 'ZoomLocal'

/**
 * Central SEO/AEO head helper. Sets title, meta description, canonical,
 * Open Graph + Twitter cards, and optional JSON-LD structured data so the
 * page is fully readable by Google and AI answer engines.
 */
export function useSeo({ title, description, path = '/', image, type = 'website', jsonLd }) {
  const url = `${SITE_URL}${path}`
  const head = {
    title,
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: type },
      { property: 'og:url', content: url },
      { property: 'og:site_name', content: SITE_NAME },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
    ],
    link: [{ rel: 'canonical', href: url }],
  }
  if (image) {
    head.meta.push(
      { property: 'og:image', content: image },
      { name: 'twitter:image', content: image }
    )
  }
  if (jsonLd) {
    const blocks = Array.isArray(jsonLd) ? jsonLd : [jsonLd]
    head.script = blocks.map((obj) => ({
      type: 'application/ld+json',
      children: JSON.stringify(obj),
    }))
  }
  useHead(head)
}

/** Organization schema, reused across pages. */
export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ZoomLocal',
  url: SITE_URL,
  email: 'info@zoomlocal.in',
  telephone: '+91-92703-62196',
  description:
    'ZoomLocal is a local growth agency. We offer Google Business Profile management (our core service), website development, Google Ads, and AEO/GEO AI search optimization for local businesses.',
  sameAs: ['https://fly-social.com'],
}
