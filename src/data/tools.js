// White-label audit tools available on ZoomLocal. `slug` matches the
// fly-social embed slug; `embed` true means it renders via the fly-social
// embed widget (Phase 2). Health tools use their own widget script.
//
// SEO fields per tool:
//   seoTitle — <title> for the tool page (keyword-first, ~60 chars)
//   keywords — meta keywords / topical hints for answer engines
//   faq      — rendered on the page AND emitted as FAQPage JSON-LD (AEO)

export const TOOL_CATEGORIES = [
  { key: 'audit', label: 'Audit & Analysis' },
  { key: 'visibility', label: 'Visibility & Rankings' },
  { key: 'reputation', label: 'Reputation' },
  { key: 'content', label: 'Content & Social' },
  { key: 'health', label: 'Healthcare Self-Tests' },
]

export const TOOLS = [
  // Audit & Analysis
  {
    slug: 'gmb-audit',
    name: 'Google Business Profile Audit',
    category: 'audit',
    tagline: 'A full health check of any Google Business Profile',
    description: 'Scores a Google Business Profile across categories, completeness, photos, posts, reviews and more, then lists exactly what to fix to rank higher on Google Maps and Search.',
    seoTitle: 'Free Google Business Profile Audit Tool — Instant GBP Score & Fix List',
    keywords: 'google business profile audit, GMB audit tool free, GBP audit, google my business checker, google maps ranking audit, local SEO audit',
    faq: [
      { q: 'What does a Google Business Profile audit check?', a: 'It checks everything Google uses to rank a business locally: primary and secondary categories, profile completeness, business description, photos, Google posts activity, review count, rating and response rate, attributes, and NAP consistency. You get a score plus a prioritised list of exactly what to fix to rank higher on Google Maps and Google Search.' },
      { q: 'Is this GBP audit tool really free?', a: 'Yes. The audit is completely free, requires no signup and no credit card, and the full report is generated in under a minute. Agencies can also white-label the same tool on their own website.' },
      { q: 'Why is my business not showing up on Google Maps?', a: 'The most common reasons are an incomplete or unverified Google Business Profile, wrong or missing categories, too few reviews, inactive posting, and inconsistent name/address/phone data across the web. Running this free audit shows you which of these is holding your profile back.' },
      { q: 'How often should I audit my Google Business Profile?', a: 'Monthly is a good rhythm. Google changes local ranking factors regularly, competitors keep optimizing, and profiles can be edited by Google or the public without you noticing. A monthly audit catches issues before they cost you rankings and calls.' },
    ],
  },
  {
    slug: 'seo-site-audit',
    name: 'SEO Site Audit',
    category: 'audit',
    tagline: 'Technical SEO health for any website',
    description: 'Crawls up to 25 pages of a website, scores its technical SEO health, and returns every error, warning and notice with a prioritised, plain-English fix list.',
    seoTitle: 'Free Website SEO Audit Tool — Technical SEO Checker & Report',
    keywords: 'free SEO audit tool, website SEO checker, technical SEO audit, site audit online free, SEO analysis report, website health check',
    faq: [
      { q: 'What does the free SEO site audit check?', a: 'It crawls up to 25 pages and checks titles, meta descriptions, headings, broken links, page speed signals, mobile-friendliness, indexability (robots, canonicals, sitemaps), structured data and duplicate content. Every issue comes back as an error, warning or notice with a plain-English explanation of how to fix it.' },
      { q: 'How is this different from Google PageSpeed Insights?', a: 'PageSpeed Insights measures performance of a single page. This audit crawls your site like a search engine does and reviews the full technical SEO picture — indexing, metadata, content structure and links — which is what actually determines whether pages can rank at all.' },
      { q: 'How do I improve my website SEO score?', a: 'Start with the errors: fix broken links, missing titles and meta descriptions, and pages blocked from indexing. Then tackle warnings like thin content, slow pages and missing structured data. Re-run the audit after each round of fixes to watch the score climb.' },
    ],
  },
  {
    slug: 'restaurant-audit',
    name: 'Restaurant Profile Audit',
    category: 'audit',
    tagline: 'A Google check built for restaurants',
    description: 'Audits a restaurant’s Google profile, menu link, food photos, bookings, delivery, ratings, and shows exactly what is missing.',
    seoTitle: 'Free Restaurant Google Profile Audit — Menu, Photos & Reviews Check',
    keywords: 'restaurant google business profile, restaurant SEO audit, restaurant google listing check, restaurant marketing audit, google maps restaurant ranking',
    faq: [
      { q: 'What does the restaurant audit check that a normal GBP audit does not?', a: 'It scores the things diners and Google specifically look for from restaurants: menu link, food and ambience photos, reservation and delivery links, price range, dine-in/takeaway attributes, popular-times data and review sentiment about food and service. It then lists exactly what is missing versus top-ranking restaurants nearby.' },
      { q: 'How do restaurants rank higher on Google Maps?', a: 'Complete every field on the Google Business Profile (especially menu, photos and attributes), collect and respond to reviews consistently, post weekly updates and offers, and keep hours accurate. Restaurants with active, complete profiles win the "restaurants near me" 3-pack far more often.' },
      { q: 'Is the restaurant audit free to run?', a: 'Yes — free, no signup, results in about a minute. Restaurant owners can run it on their own listing, and agencies can run it on prospects or embed it white-label on their own site.' },
    ],
  },
  {
    slug: 'linkedin-audit',
    name: 'LinkedIn Profile Audit',
    category: 'audit',
    tagline: 'Make any LinkedIn profile stronger',
    description: 'Reviews a LinkedIn profile’s headline, About section and posts, and returns clear, specific improvements.',
    seoTitle: 'Free LinkedIn Profile Audit Tool — Headline & About Section Review',
    keywords: 'linkedin profile audit free, linkedin profile checker, improve linkedin profile, linkedin headline examples, linkedin profile optimization',
    faq: [
      { q: 'What does the LinkedIn profile audit review?', a: 'It reviews your headline, About section, experience descriptions, and recent posting activity, then returns specific rewrites and improvements — not generic advice. You see exactly what to change to look stronger to prospects, recruiters and partners.' },
      { q: 'What makes a good LinkedIn headline?', a: 'A good headline says who you help and what outcome you deliver, not just a job title. "Helping local businesses rank #1 on Google Maps | Local SEO" beats "Marketing Manager". The audit generates headline options in this outcome-first format for your profile.' },
      { q: 'Is this LinkedIn checker free and private?', a: 'Yes, it is free with no signup. It only reads what is publicly visible on the profile you enter — the same things any visitor sees.' },
    ],
  },
  {
    slug: 'instagram-audit',
    name: 'Instagram Profile Audit',
    category: 'audit',
    tagline: 'See how an Instagram profile measures up',
    description: 'Scores an Instagram profile against industry benchmarks and returns a bio rewrite, hashtag strategy and a 30-day growth plan with ready captions.',
    seoTitle: 'Free Instagram Audit Tool — Profile Score, Bio Rewrite & Growth Plan',
    keywords: 'instagram audit tool free, instagram profile analyzer, instagram bio ideas business, instagram growth plan, instagram engagement checker',
    faq: [
      { q: 'What does the Instagram audit analyze?', a: 'It scores your bio, profile completeness, posting frequency, content mix and engagement against benchmarks for your industry, then returns a rewritten bio, a hashtag strategy and a 30-day content plan with ready-to-post captions.' },
      { q: 'How can a local business grow on Instagram?', a: 'Post consistently (3–4 times a week), use location tags and local hashtags, show real work and real customers, and make the bio say clearly what you do and where. The audit turns these into a concrete 30-day plan for your specific profile.' },
      { q: 'Is the Instagram audit free?', a: 'Yes — free, no signup, and the report takes about a minute. Agencies can white-label it as a lead magnet on their own websites.' },
    ],
  },

  // Visibility & Rankings
  {
    slug: 'local-rank-check',
    name: 'Local Rank Checker',
    category: 'visibility',
    tagline: 'See where a business shows up on Google Maps',
    description: 'Maps where a business ranks across its area for a search term, and where competitors are beating it in the local 3-pack.',
    seoTitle: 'Free Local Rank Checker — Google Maps Ranking Grid by Location',
    keywords: 'local rank checker free, google maps rank tracker, local 3 pack ranking, check google maps position, geo grid rank check, local SEO rank tool',
    faq: [
      { q: 'How does the local rank checker work?', a: 'It searches your keyword from a grid of points across your area and records where your business appears on Google Maps at each point. You see a map of green (top 3), amber and red positions — because local rankings change street by street, a single "we rank #2" number is misleading.' },
      { q: 'What is the Google local 3-pack and why does it matter?', a: 'The 3-pack is the block of three map results Google shows above normal results for local searches. It captures the majority of clicks and calls for "near me" searches, so moving from position 5 to position 3 is often the difference between a quiet phone and a busy one.' },
      { q: 'Why do I rank well in one area but not a few streets away?', a: 'Proximity is a core local ranking factor — Google weighs the searcher\'s exact location. Beyond your immediate radius, rankings depend on relevance and prominence: categories, reviews, citations and profile activity. The grid view shows exactly where your visibility drops off so you know where to focus.' },
    ],
  },
  {
    slug: 'ai-search-visibility',
    name: 'AI Search Visibility',
    category: 'visibility',
    tagline: 'How often AI engines recommend a business',
    description: 'Runs real buying-intent prompts through ChatGPT, Gemini, Claude and Perplexity, then shows how often a business is mentioned, who gets recommended instead, and the sources the AI cited.',
    seoTitle: 'Free AI Search Visibility Checker — Is ChatGPT Recommending You?',
    keywords: 'AI search visibility, chatgpt business recommendation, AEO tool, GEO tool, perplexity visibility check, AI SEO checker, generative engine optimization',
    faq: [
      { q: 'What is AI search visibility?', a: 'It is how often AI assistants — ChatGPT, Gemini, Claude, Perplexity — mention or recommend your business when people ask questions like "best dentist near me" or "recommend a marketing agency in Pune". Millions of buyers now ask AI instead of Google, and if the AI never names you, you are invisible to them.' },
      { q: 'How does this tool measure AI visibility?', a: 'It runs real buying-intent prompts for your category and city through ChatGPT, Gemini, Claude and Perplexity, then reports how often you were mentioned, which competitors were recommended instead, and which web sources the AI engines cited — so you know exactly where to get listed and what content to publish.' },
      { q: 'How do I get my business recommended by ChatGPT?', a: 'AI engines recommend businesses that are clearly described on sources they trust: your website, Google Business Profile, directories and review sites. Publish pages that directly answer buyer questions, keep structured data (schema) on your site, maintain an active GBP, and get cited on the sources the AI already uses. This is called AEO/GEO — and it is a core ZoomLocal service.' },
      { q: 'What is the difference between AEO and GEO?', a: 'AEO (Answer Engine Optimization) is optimizing to be the direct answer — in featured snippets, voice results and AI answers. GEO (Generative Engine Optimization) is optimizing to be cited and recommended inside generated responses from LLM-based engines like ChatGPT and Perplexity. In practice they overlap heavily: clear entity data, question-shaped content and trusted citations drive both.' },
    ],
  },
  {
    slug: 'google-posts-health-check',
    name: 'Google Posts Health Check',
    category: 'visibility',
    tagline: 'Are they posting on Google, and posting right',
    description: 'Checks how often and how well a business posts on Google, keywords, CTAs, locality, consistency, and returns a score plus a 30-day posting plan.',
    seoTitle: 'Free Google Posts Checker — GBP Posting Score & 30-Day Plan',
    keywords: 'google business posts, GBP posting strategy, google posts examples, how often to post on google business profile, google posts SEO',
    faq: [
      { q: 'Do Google Business posts help local SEO?', a: 'Yes. Regular posting signals to Google that the business is active, adds fresh keyword-relevant content to the profile, and increases engagement (clicks, calls) — all of which correlate with better local rankings. Profiles that post weekly consistently outperform silent ones.' },
      { q: 'How often should a business post on its Google Business Profile?', a: 'At least once a week. Google posts expire from the main view after about a week, so weekly posting keeps the profile permanently fresh. The health check scores your current frequency and gives you a ready 30-day posting plan.' },
      { q: 'What makes a good Google post?', a: 'A real photo, 100–300 words that mention the service and the city, and a clear call-to-action button (Call, Book, Learn more). The checker scores your recent posts on exactly these factors — keywords, CTAs, locality and consistency.' },
    ],
  },

  // Reputation
  {
    slug: 'review-analysis',
    name: 'Review Analysis',
    category: 'reputation',
    tagline: 'What customers really think',
    description: 'Reads every Google review and consolidates it into a simple sentiment report, what people love, what they complain about, and which issues repeat.',
    seoTitle: 'Free Google Review Analysis Tool — Sentiment Report in Seconds',
    keywords: 'google review analysis, review sentiment analysis free, customer feedback analysis, google reviews report, reputation analysis tool',
    faq: [
      { q: 'What does the review analysis tool do?', a: 'It reads all of a business\'s Google reviews and produces a clear sentiment report: what customers consistently praise, what they complain about, which issues repeat over time, and how sentiment is trending. Hours of reading condensed into a one-page report.' },
      { q: 'Why analyze Google reviews?', a: 'Reviews are both a ranking factor and your most honest customer research. Repeated complaints (wait times, pricing, a specific staff issue) quietly kill conversion even with a good star rating — and repeated praise tells you exactly what to lead with in your marketing.' },
      { q: 'Can I run this on a competitor?', a: 'Yes. Reviews are public, so running the analysis on competitors shows you their weaknesses — the complaints you can win their customers with — and the strengths you need to match.' },
    ],
  },
  {
    slug: 'review-response-generator',
    name: 'AI Review Response Generator',
    category: 'reputation',
    tagline: 'Quick, warm replies to reviews',
    description: 'Fetches recent Google reviews and writes three ready-to-use replies for each, empathetic, professional and short.',
    seoTitle: 'Free AI Review Reply Generator — Respond to Google Reviews Fast',
    keywords: 'review response generator free, reply to google reviews, AI review reply, respond to negative review example, review response templates',
    faq: [
      { q: 'Why should businesses respond to every Google review?', a: 'Google has confirmed that responding to reviews improves local SEO, and customers read responses before choosing a business. Replying to every review — positive and negative — shows you are active and accountable, lifts conversion, and encourages more reviews.' },
      { q: 'How do I respond to a negative review professionally?', a: 'Thank the reviewer, acknowledge the specific issue without arguing, state what you are doing about it, and take the conversation offline with a contact. Never get defensive publicly. The generator drafts responses in exactly this structure, ready to edit and post.' },
      { q: 'Does this tool write responses for my actual reviews?', a: 'Yes — it fetches your recent Google reviews and writes three tailored reply options for each one (empathetic, professional, short), rather than handing you generic templates.' },
    ],
  },

  // Content & Social
  {
    slug: 'caption-generator',
    name: 'AI Caption Generator',
    category: 'content',
    tagline: 'Ready-to-post captions for every platform',
    description: 'Generates native captions for Instagram, Facebook, LinkedIn, X, TikTok and Google Business, three variants each, with hashtags and a creative idea for the visual.',
    seoTitle: 'Free AI Caption Generator — Instagram, Facebook, LinkedIn & GBP',
    keywords: 'AI caption generator free, instagram caption generator, social media caption writer, google business post generator, hashtag generator',
    faq: [
      { q: 'Which platforms does the caption generator support?', a: 'Instagram, Facebook, LinkedIn, X (Twitter), TikTok and Google Business Profile — with three caption variants per platform, each written in that platform\'s native tone and length, plus hashtags and an idea for the visual.' },
      { q: 'Are AI-generated captions good for engagement?', a: 'They are a strong first draft: platform-appropriate length, a hook up front, and a call to action. Add one specific real detail (a customer, a number, today\'s photo) before posting and they routinely outperform captions written from a blank page.' },
      { q: 'Is the caption generator free?', a: 'Yes — free and unlimited, no signup. Agencies can also embed it white-label on their own site as a lead magnet.' },
    ],
  },
  {
    slug: 'gbp-description-generator',
    name: 'AI GBP Description Generator',
    category: 'content',
    tagline: 'A ready-to-use Google profile description',
    description: 'Writes an SEO-friendly Google Business Profile description with the city, service and a clear call to action, ready to paste.',
    seoTitle: 'Free Google Business Description Generator — SEO-Optimized in 30s',
    keywords: 'google business profile description generator, GBP description examples, google my business description, business description generator free',
    faq: [
      { q: 'What makes a good Google Business Profile description?', a: 'Lead with what you do and where ("Family dental clinic in Andheri West…"), mention your main services and differentiators naturally, and end with a call to action. Use most of the 750-character limit, put the important keywords in the first 250 characters, and never stuff keywords — Google suspends profiles for that.' },
      { q: 'Does the GBP description affect local rankings?', a: 'Directly, only modestly — but it strongly affects conversion once someone views your profile, and it feeds the entity understanding Google and AI engines build about your business. A clear, keyword-relevant description helps you show up for the right searches and win the click.' },
      { q: 'How does the generator work?', a: 'Enter your business name, city and services, and it writes an SEO-friendly description with the right keyword placement and a call to action — ready to paste straight into your Google Business Profile.' },
    ],
  },
  {
    slug: 'content-calendar-generator',
    name: '90-Day Content Calendar Generator',
    category: 'content',
    tagline: 'Three months of posts, planned',
    description: 'Builds a 90-day social content calendar with captions, hashtags, formats and image ideas, so there is never a blank page.',
    seoTitle: 'Free 90-Day Content Calendar Generator — Social Posts Planned',
    keywords: 'content calendar generator free, social media content calendar, 90 day content plan, small business content ideas, posting schedule generator',
    faq: [
      { q: 'What does the content calendar include?', a: 'Ninety days of planned posts: the topic, the platform, the format (photo, reel, carousel, offer), a ready caption, hashtags and an image idea for each. It mixes promotional, educational, social-proof and seasonal content in a healthy ratio.' },
      { q: 'How far ahead should a small business plan content?', a: 'A month minimum, a quarter ideally. Planning 90 days ahead means seasonal moments, offers and launches are never missed, and posting keeps happening during busy weeks — consistency is what algorithms and audiences reward.' },
      { q: 'Is the calendar personalised to my business?', a: 'Yes — it is generated from your business type, city and audience, so a Pune café and a Delhi dental clinic get completely different calendars, each with locally relevant ideas.' },
    ],
  },

  // Healthcare self-tests (rendered via their own Vercel widget scripts)
  {
    slug: 'smile-score',
    name: 'SmileScore (Dental)',
    category: 'health',
    tagline: 'A free smile self-check for dental clinics',
    description: 'Lets a visitor take a quick smile self-assessment from a photo, then delivers the result to the clinic as a warm lead.',
    seoTitle: 'Free Online Smile Test — SmileScore Self-Check for Dental Patients',
    keywords: 'online smile test, smile assessment free, dental self check, teeth check online, dental clinic lead generation',
    faq: [
      { q: 'How does the SmileScore test work?', a: 'You upload a photo of your smile and answer a few quick questions; the tool returns a smile score with observations about alignment, shade and visible issues, plus what a dentist would likely recommend. It takes under two minutes.' },
      { q: 'Is SmileScore a replacement for seeing a dentist?', a: 'No — it is a self-assessment, not a diagnosis. It helps you understand what a dentist might look at and whether a visit is worth booking. Only a clinical examination can diagnose dental conditions.' },
      { q: 'How do dental clinics use SmileScore?', a: 'Clinics embed it on their website as a patient-engagement tool: visitors take the free self-check, and interested patients arrive as warm leads with context. ZoomLocal sets this up white-label for dental practices.' },
    ],
    health: true,
    widget: { id: 'smile-score-widget', src: 'https://smile-score-widget.vercel.app/smile-score-widget.js' },
  },
  {
    slug: 'hearing-test',
    name: 'Hearing Test (ENT)',
    category: 'health',
    tagline: 'A free online hearing screen for ENT clinics',
    description: 'A simple online hearing screening visitors can take from their phone, with the result sent to the clinic as a lead.',
    seoTitle: 'Free Online Hearing Test — Quick Hearing Screening From Your Phone',
    keywords: 'online hearing test free, hearing screening online, check hearing on phone, ENT clinic hearing check, audiologist online test',
    faq: [
      { q: 'How accurate is an online hearing test?', a: 'A phone-based screening can reliably flag whether your hearing is in a normal range or worth a professional check, but it is a screening, not an audiogram. Use headphones in a quiet room for the best result, and see an ENT or audiologist for a clinical assessment if it flags anything.' },
      { q: 'How does the online hearing test work?', a: 'You listen to tones at different frequencies and volumes through headphones and respond to what you can hear. It takes about three minutes and gives an immediate indication of your hearing range.' },
      { q: 'How do ENT clinics use this test?', a: 'Clinics embed it on their website: visitors screen themselves for free, and those with flagged results can book a proper assessment — arriving as informed, motivated patients. ZoomLocal sets this up white-label for ENT and audiology practices.' },
    ],
    health: true,
    widget: { id: 'hearing-test-widget', src: 'https://hearing-test-widget.vercel.app/hearing-test-widget.js' },
  },
  {
    slug: 'eye-test',
    name: 'Eye Test (Optometry)',
    category: 'health',
    tagline: 'A free vision self-test for eye clinics',
    description: 'A quick online vision self-test for visitors, delivering each result to the optometry clinic as a lead.',
    seoTitle: 'Free Online Eye Test — Quick Vision Self-Check for Your Screen',
    keywords: 'online eye test free, vision test online, check eyesight online, eye clinic self test, optometrist online screening',
    faq: [
      { q: 'Can I really test my vision online?', a: 'You can screen it. The test checks visual acuity and common issues from your screen at a set distance, which reliably indicates whether a full eye exam is worth booking. It does not replace a clinical exam and cannot prescribe glasses.' },
      { q: 'How long does the online eye test take?', a: 'About three minutes. You sit at the indicated distance from your screen, cover one eye at a time, and respond to the letters and symbols shown. Results appear immediately.' },
      { q: 'How do optometry clinics use this test?', a: 'Clinics embed it on their website as a free self-check for visitors; people whose results suggest a full exam become warm booking leads. ZoomLocal sets this up white-label for optometrists and eye hospitals.' },
    ],
    health: true,
    widget: { id: 'optometrist-widget', src: 'https://optometrist-widget.vercel.app/optometrist-widget.js' },
  },
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
