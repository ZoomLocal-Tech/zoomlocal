// White-label audit tools available on ZoomLocal. `slug` matches the
// fly-social embed slug; `embed` true means it renders via the fly-social
// embed widget (Phase 2). Health tools use their own widget script.

export const TOOL_CATEGORIES = [
  { key: 'audit', label: 'Audit & Analysis' },
  { key: 'visibility', label: 'Visibility & Rankings' },
  { key: 'reputation', label: 'Reputation' },
  { key: 'content', label: 'Content & Social' },
  { key: 'health', label: 'Healthcare Self-Tests' },
]

export const TOOLS = [
  // Audit & Analysis
  { slug: 'gmb-audit', name: 'Google Business Profile Audit', category: 'audit', tagline: 'A full health check of any Google Business Profile', description: 'Scores a Google Business Profile across categories, completeness, photos, posts, reviews and more, then lists exactly what to fix to rank higher on Google Maps and Search.' },
  { slug: 'seo-site-audit', name: 'Website SEO Audit', category: 'audit', tagline: 'Technical SEO health for any website', description: 'Crawls up to 25 pages of a website, scores its technical SEO health, and returns every error, warning and notice with a prioritised, plain-English fix list.' },
  { slug: 'website-local-seo-audit', name: 'Website Local SEO Audit', category: 'audit', tagline: 'How well a site is set up for local search', description: 'Checks a website for the on-page local SEO signals Google relies on, NAP, local keywords, schema and more, and shows what to improve.' },
  { slug: 'restaurant-audit', name: 'Restaurant Profile Audit', category: 'audit', tagline: 'A Google check built for restaurants', description: 'Audits a restaurant’s Google profile, menu link, food photos, bookings, delivery, ratings, and shows exactly what is missing.' },
  { slug: 'linkedin-audit', name: 'LinkedIn Profile Audit', category: 'audit', tagline: 'Make any LinkedIn profile stronger', description: 'Reviews a LinkedIn profile’s headline, About section and posts, and returns clear, specific improvements.' },
  { slug: 'instagram-audit', name: 'Instagram Profile Audit', category: 'audit', tagline: 'See how an Instagram profile measures up', description: 'Scores an Instagram profile against industry benchmarks and returns a bio rewrite, hashtag strategy and a 30-day growth plan with ready captions.' },
  { slug: 'social-profile-audit', name: 'Multi-Platform Social Audit', category: 'audit', tagline: 'One report across every social channel', description: 'Audits a business across its social profiles in a single report so you can see where it is strong and where it is falling behind.' },

  // Visibility & Rankings
  { slug: 'local-rank-check', name: 'Local Rank Checker', category: 'visibility', tagline: 'See where a business shows up on Google Maps', description: 'Maps where a business ranks across its area for a search term, and where competitors are beating it in the local 3-pack.' },
  { slug: 'ai-search-visibility', name: 'AI Search Visibility', category: 'visibility', tagline: 'How often AI engines recommend a business', description: 'Runs real buying-intent prompts through ChatGPT, Gemini, Claude and Perplexity, then shows how often a business is mentioned, who gets recommended instead, and the sources the AI cited.' },
  { slug: 'google-posts-health-check', name: 'Google Posts Activity Score', category: 'visibility', tagline: 'Are they posting on Google, and posting right', description: 'Checks how often and how well a business posts on Google, keywords, CTAs, locality, consistency, and returns a score plus a 30-day posting plan.' },
  { slug: 'website-geo-scan', name: 'Website GEO Scan', category: 'visibility', tagline: 'Is your site ready for AI search', description: 'Scans a website for the signals AI answer engines look for, so you know whether it is set up to be cited by ChatGPT, Gemini and Perplexity.' },

  // Reputation
  { slug: 'review-analysis', name: 'Review Analysis', category: 'reputation', tagline: 'What customers really think', description: 'Reads every Google review and consolidates it into a simple sentiment report, what people love, what they complain about, and which issues repeat.' },
  { slug: 'review-response-generator', name: 'AI Review Response Generator', category: 'reputation', tagline: 'Quick, warm replies to reviews', description: 'Fetches recent Google reviews and writes three ready-to-use replies for each, empathetic, professional and short.' },
  { slug: 'reputation-audit', name: 'Reputation Audit', category: 'reputation', tagline: 'A full read on a business’s online reputation', description: 'Pulls together ratings, review trends and response rates into one clear reputation health report.' },

  // Content & Social
  { slug: 'caption-generator', name: 'AI Caption Generator', category: 'content', tagline: 'Ready-to-post captions for every platform', description: 'Generates native captions for Instagram, Facebook, LinkedIn, X, TikTok and Google Business, three variants each, with hashtags and a creative idea for the visual.' },
  { slug: 'gbp-description-generator', name: 'AI GBP Description Generator', category: 'content', tagline: 'A ready-to-use Google profile description', description: 'Writes an SEO-friendly Google Business Profile description with the city, service and a clear call to action, ready to paste.' },
  { slug: 'content-calendar-generator', name: '90-Day Content Calendar', category: 'content', tagline: 'Three months of posts, planned', description: 'Builds a 90-day social content calendar with captions, hashtags, formats and image ideas, so there is never a blank page.' },
  { slug: 'content-ideas', name: 'Content Idea Generator', category: 'content', tagline: 'Never run out of things to post', description: 'Generates fresh, on-brand content ideas tailored to a business and its audience.' },
  { slug: 'competitor-social-audit', name: 'Competitor Social Audit', category: 'content', tagline: 'See what competitors are doing on social', description: 'Analyses a competitor’s social presence so you know what is working for them and where the gaps are.' },

  // Healthcare self-tests
  { slug: 'smile-score', name: 'SmileScore (Dental)', category: 'health', tagline: 'A free smile self-check for dental clinics', description: 'Lets a visitor take a quick smile self-assessment from a photo, then delivers the result to the clinic as a warm lead.', health: true },
  { slug: 'hearing-test', name: 'Hearing Test (ENT)', category: 'health', tagline: 'A free online hearing screen for ENT clinics', description: 'A simple online hearing screening visitors can take from their phone, with the result sent to the clinic as a lead.', health: true },
  { slug: 'eye-test', name: 'Eye Test (Optometry)', category: 'health', tagline: 'A free vision self-test for eye clinics', description: 'A quick online vision self-test for visitors, delivering each result to the optometry clinic as a lead.', health: true },
]

export function getToolBySlug(slug) {
  return TOOLS.find((t) => t.slug === slug)
}

export function toolsByCategory() {
  return TOOL_CATEGORIES.map((c) => ({
    ...c,
    tools: TOOLS.filter((t) => t.category === c.key),
  })).filter((c) => c.tools.length)
}
