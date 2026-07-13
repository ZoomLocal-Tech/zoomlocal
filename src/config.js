// ZoomLocal agency embed config (fly-social white-label).
export const EMBED_AGENCY_SLUG = 'manu-mani-leads-2'
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

// Per-tool fly-social account override. Empty while every live embed runs on
// the default account; add `'tool-slug': 'other-account'` here if one moves.
export const EMBED_SLUG_OVERRIDES = {}

export function embedUrl(toolSlug) {
  if (!EMBED_ENABLED.has(toolSlug)) return ''
  const slug = EMBED_SLUG_OVERRIDES[toolSlug] || EMBED_AGENCY_SLUG
  if (!slug) return ''
  return `${EMBED_ORIGIN}/embed/${slug}/${toolSlug}`
}
