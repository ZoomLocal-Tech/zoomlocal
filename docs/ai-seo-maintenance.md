# zoomlocal.in: AI Search & SEO Maintenance Plan

**Goal:** keep zoomlocal.in ranking in Google **and** getting recommended by AI engines (ChatGPT, Gemini, Claude, Perplexity).
**How to use:** assign each task an owner, do it on the listed cadence, and tick it off. AI engines favour fresh, well-structured, frequently-cited sites, so consistency matters more than big one-off pushes.

---

## Daily

| Task | Owner | Why it matters |
|---|---|---|
| Respond to any new Google reviews on the ZoomLocal / Fly GBP | Support | Active GBP feeds local + entity signals that both Google and AI use. |
| Quick check that zoomlocal.in is up and the tools load | Dev | A down or broken tool page loses leads and hurts crawl trust. |

## Weekly

| Task | Owner | Why it matters |
|---|---|---|
| Publish 1 new blog post (or update an old one) targeting a real question agencies/businesses ask | Marketing | Fresh, question-shaped content is the #1 driver of both SEO and AI citations. |
| Share each new post on LinkedIn + X with a link back to zoomlocal.in | Marketing | Social signals + backlinks help AI engines discover and trust the page. |
| Review Google Search Console: new queries, impressions, crawl errors | Marketing/Dev | Catch indexing problems early; find keywords to write about next. |
| Post 1 update on the Google Business Profile | Marketing | Keeps the business entity active in Google's local + knowledge graph. |

## Monthly

| Task | Owner | Why it matters |
|---|---|---|
| Run the **AI Search Visibility** tool for your key prompts (e.g. "best white-label audit tools", "managed local SEO India") and log where you appear vs competitors | Marketing | Direct measure of AI ranking; shows which prompts to target with content. |
| Run the **SEO Site Audit** tool on zoomlocal.in and fix the top issues (titles, meta, alt text, thin content, schema) | Dev | Technical health is a ranking prerequisite for Google and AI crawlers. |
| Add/refresh **structured data** (Organization, Product, FAQ, Article schema) on key pages and validate it | Dev | Schema is how AI engines reliably extract facts about you. |
| Build 3-5 new citations / get listed on directories AI engines cite (e.g. the source domains shown in the AI Visibility report) | Marketing | AI recommends what its sources mention; being on those sources earns mentions. |
| Check Core Web Vitals / page speed (PageSpeed Insights) | Dev | Slow pages get demoted and crawled less by both Google and AI bots. |
| Refresh `sitemap.xml`, confirm `robots.txt` and `llms.txt` are current | Dev | Tells crawlers (and AI bots) exactly what to read; llms.txt is AI-specific. |
| Update the 2-3 oldest blog posts with new info + current year | Marketing | Freshness signals keep older pages ranking and quotable. |

## Quarterly

| Task | Owner | Why it matters |
|---|---|---|
| Full content audit: merge thin pages, expand top pages to 600+ words, add FAQs | Marketing | Depth + FAQs are heavily favoured by AI answer engines. |
| Competitor gap check: what are Semrush/BrightLocal/etc. ranked for that you are not | Marketing | Find content and prompt gaps to close. |
| Re-run all tools' embeds + lead capture end-to-end on zoomlocal.in | Dev | Make sure nothing silently broke after platform updates. |
| Review and update pricing + tool list pages | Product | Accurate, current info is what AI engines prefer to cite. |

## On every new page / blog post (checklist)

| Item | Why |
|---|---|
| Unique 50-60 char `<title>` with the primary keyword near the front | Strongest on-page ranking + click signal |
| 140-160 char meta description with keyword + a call to action | Controls the snippet; improves CTR |
| One `<h1>` stating the topic; logical `<h2>`/`<h3>` structure | Tells Google + AI crawlers what the page is about |
| Alt text on every image | Accessibility + image-search + context signals |
| Article/FAQ schema added and validated | Lets AI extract and cite the content |
| Self-referencing canonical + Open Graph tags | Avoids duplicate-content splits; clean social/AI previews |
| Internal links to/from related pages | Spreads authority; helps crawlers find everything |
| At least 600 words of genuinely useful content | Thin pages rarely rank or get cited |

---

## Notes for the team
- **Prerendering is mandatory:** the site must serve real HTML (static-generated), not a blank SPA shell, or none of the above ranks. Confirm new pages appear in "View Source", not just after JavaScript runs.
- **Use our own tools:** the AI Search Visibility and SEO Site Audit tools are the measurement loop, run them monthly and let the results drive the content calendar.
- **Consistency beats bursts:** one post a week for a year ranks far better than 50 posts in one month then silence.
