// ZoomLocal agency embed config (fly-social white-label).
export const EMBED_AGENCY_SLUG = 'vidya-surendran-leads'
export const EMBED_ORIGIN = 'https://www.fly-social.com'

// Only these tools have a live embed enabled on the agency account. Other
// tools keep their SEO page + "talk to us" call to action until enabled.
export const EMBED_ENABLED = new Set([
  'gmb-audit',
  'local-rank-check',
  'review-analysis',
  'gbp-description-generator',
  'review-response-generator',
  'caption-generator',
  'content-calendar-generator',
  'linkedin-audit',
  'instagram-audit',
  'google-posts-health-check',
  'restaurant-audit',
  'ai-search-visibility',
  'seo-site-audit',
])

export function embedUrl(toolSlug) {
  if (!EMBED_AGENCY_SLUG || !EMBED_ENABLED.has(toolSlug)) return ''
  return `${EMBED_ORIGIN}/embed/${EMBED_AGENCY_SLUG}/${toolSlug}`
}
