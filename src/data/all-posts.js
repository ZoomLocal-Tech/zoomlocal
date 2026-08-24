// Every article on zoomlocal.in, from both of the places one can come from.
//
// posts.js holds the articles that were written into this repository by hand
// and is left exactly as it is. cms-articles.js is generated: the Fly CMS
// commits it whenever an article is published for this website, and the push it
// arrives on is what runs the existing Firebase deploy workflow.
//
// Everything that reads articles reads THIS file, never posts.js: the blog
// list, the article page, the header menu, the vite-ssg config that decides
// which article routes to prerender and the script that writes sitemap.xml.
// That is the whole point of it. An article from the CMS is prerendered, is in
// the sitemap and carries its JSON-LD in exactly the same way as one that was
// typed into posts.js, because nothing downstream can tell the two apart.
//
// Plain data with no imports beyond the two article sources, because
// vite.config.js and scripts/gen-sitemap.mjs both import it from Node.

import { POSTS as REPO_POSTS } from './posts.js'
import { CMS_ARTICLES } from './cms-articles.js'

/** 'YYYY-MM-DD', which is the date shape every post here already uses. */
function dayOf(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toISOString().slice(0, 10)
}

/** Words out of markup, for an article that carries no summary of its own. */
function summarise(html, max = 200) {
  const text = String(html || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,.;:]+$/, '')}…`
}

/**
 * One article from the CMS, in the shape the pages already expect.
 *
 * The CMS names its fields the way the database does. Mapping them here rather
 * than in the pages keeps the two sources indistinguishable everywhere else,
 * which is what stops the blog list and the article page slowly growing two
 * versions of every line.
 */
function fromCms(a) {
  return {
    slug: String(a.slug || ''),
    title: String(a.title || ''),
    // Only set when the CMS was given a shorter search-result headline. The
    // article page falls back to the full title, exactly as it does for a post
    // typed into posts.js that has no seoTitle.
    seoTitle: a.seo_title || undefined,
    description: a.seo_description || a.excerpt || summarise(a.content),
    date: dayOf(a.published_at),
    author: a.author_name || 'ZoomLocal',
    readingTime: a.read_time_minutes ? `${a.read_time_minutes} min` : '',
    tags: Array.isArray(a.tags) ? a.tags : [],
    html: String(a.content || ''),
    faqs: Array.isArray(a.faqs) ? a.faqs : [],
    image: a.featured_image_url || null,
    canonical: a.canonical_url || null,
    noindex: a.noindex === true,
    source: 'cms',
  }
}

/** A hand-written post, filled out so both sources have identical fields. */
function fromRepo(p) {
  return {
    ...p,
    tags: Array.isArray(p.tags) ? p.tags : [],
    faqs: Array.isArray(p.faqs) ? p.faqs : [],
    image: p.image || null,
    canonical: p.canonical || null,
    noindex: false,
    source: 'repo',
  }
}

/** Newest first, and an article with no date after the ones that have one. */
function byNewest(a, b) {
  if (a.date && b.date && a.date !== b.date) return b.date.localeCompare(a.date)
  if (a.date && !b.date) return -1
  if (!a.date && b.date) return 1
  return a.title.localeCompare(b.title)
}

/**
 * Both sources as one list, newest first.
 *
 * When the same web address exists in both, the CMS copy wins. That is not
 * arbitrary: the CMS copy is the one somebody can open and edit, so if the two
 * ever disagree, showing the hand-written one would mean an editor's change
 * quietly never appearing on the site.
 */
export const POSTS = (() => {
  const bySlug = new Map()
  for (const p of REPO_POSTS) {
    const post = fromRepo(p)
    if (post.slug) bySlug.set(post.slug, post)
  }
  for (const a of CMS_ARTICLES) {
    const post = fromCms(a)
    if (post.slug) bySlug.set(post.slug, post)
  }
  return Array.from(bySlug.values()).sort(byNewest)
})()

/** The articles that belong in sitemap.xml: everything not marked noindex. */
export const INDEXABLE_POSTS = POSTS.filter((p) => !p.noindex)

export function getPostBySlug(slug) {
  return POSTS.find((p) => p.slug === slug)
}
