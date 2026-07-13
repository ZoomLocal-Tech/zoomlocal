// Blog posts. Plain data so it can be imported by vite.config for SSG route
// generation. `html` is the rendered post body.

export const POSTS = [
  {
    slug: 'show-up-in-ai-search-local-business',
    title: 'How to Show Up in AI Search (ChatGPT, Gemini, Perplexity) as a Local Business',
    description:
      'AI assistants now recommend businesses directly. Here is a practical, step-by-step way for a local business to get mentioned in ChatGPT, Gemini, Claude and Perplexity.',
    date: '2026-06-23',
    author: 'ZoomLocal',
    readingTime: '6 min',
    tags: ['AI Search', 'Local SEO'],
    html: `
<p>More and more people skip Google and ask an AI assistant instead: "who is the best dentist near me?", "recommend a marketing agency in Pune". If the AI does not mention your business, you are invisible to those buyers. The good news: getting recommended by AI follows clear, repeatable rules.</p>

<h2>1. AI recommends what its sources mention</h2>
<p>ChatGPT, Gemini, Claude and Perplexity build answers from the web pages and directories they trust. If your business is described clearly on your own site and on the directories these engines cite, you become a candidate for recommendation. Start by checking which sources the AI already pulls from for your category, then make sure you are listed there.</p>

<h2>2. Write content that answers real questions</h2>
<p>AI engines love pages that directly answer a question in plain language. Create pages and posts shaped like the questions your customers ask, "how much does X cost", "what is the best Y in [city]", and answer them in the first paragraph. Add an FAQ section to every important page.</p>

<h2>3. Add structured data (schema)</h2>
<p>Schema markup (Organization, Product, FAQ, Article) is how machines reliably extract facts about you, your name, services, location, prices and answers. Pages with valid schema are far easier for AI to quote correctly.</p>

<h2>4. Keep your Google Business Profile active</h2>
<p>A complete, active Google Business Profile feeds the local and entity signals both Google and AI use to understand who you are. Post weekly, respond to every review, and keep your categories and services accurate.</p>

<h2>5. Measure it every month</h2>
<p>You cannot improve what you do not measure. Run an AI visibility check each month, ask the engines the exact prompts your customers would use, and track whether you appear, who appears instead, and which sources they cite. Then create content to close the gaps.</p>

<p>Do these five things consistently and your business moves from invisible to recommended in AI search, the channel your competitors are still ignoring.</p>
`,
  },
  {
    slug: 'what-is-managed-google-business-profile-service',
    title: 'What Is a Managed Google Business Profile Service (and Is It Worth It)?',
    description:
      'A managed Google Business Profile service means experts run your local SEO for you, reviews, posts, rankings, protection and reporting. Here is what is included and who it suits.',
    date: '2026-06-23',
    author: 'ZoomLocal',
    readingTime: '5 min',
    tags: ['Local SEO', 'Managed Services'],
    html: `
<p>Your Google Business Profile is often the first thing a customer sees, and one of the biggest drivers of calls, directions and visits. But keeping it optimised takes consistent work most owners never get to. A managed service hands that work to a dedicated team.</p>

<h2>What a managed service handles</h2>
<ul>
<li><strong>Reputation:</strong> monitoring and responding to every review, and generating new ones.</li>
<li><strong>Profile optimisation and protection:</strong> getting your categories, services and description right, and watching 24/7 for unauthorised changes.</li>
<li><strong>Content:</strong> publishing weekly Google posts (updates, offers, events) to keep your profile active.</li>
<li><strong>Rank tracking and SEO:</strong> tracking your keywords and local-pack position over time.</li>
<li><strong>Reporting:</strong> a clear monthly report of views, calls, directions and bookings.</li>
</ul>

<h2>Who it suits</h2>
<p>Managed Local SEO fits owners who are too busy to manage Google themselves, multi-location brands that need consistency, healthcare providers where accuracy matters, and service businesses that depend on local search for leads.</p>

<h2>Is it worth it?</h2>
<p>If local search drives your customers, then yes, because the cost of a poorly managed profile is invisible: the calls and visits you never received. A managed service turns your profile into a steady source of local customers without adding work to your plate.</p>

<p>Want it handled for you? <a href="/#contact">Talk to our team</a> and we will run your Google Business Profile end to end.</p>
`,
  },
]

export function getPostBySlug(slug) {
  return POSTS.find((p) => p.slug === slug)
}
