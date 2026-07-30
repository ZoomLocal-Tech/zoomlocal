import { writeFileSync } from 'node:fs'
import { TOOLS } from '../src/data/tools.js'
import { POSTS } from '../src/data/posts.js'

const SITE = 'https://zoomlocal.in'

// Only blog posts get a <lastmod>: they carry a real date. Stamping every URL
// with the build date told crawlers every page changed on every deploy, which
// makes lastmod meaningless to them.
const entries = [
  { path: '/' },
  { path: '/pricing' },
  { path: '/tools' },
  { path: '/blog' },
  ...TOOLS.map((t) => ({ path: `/tools/${t.slug}` })),
  ...POSTS.map((p) => ({ path: `/blog/${p.slug}`, lastmod: p.date })),
]

const body = entries
  .map((e) => `  <url><loc>${SITE}${e.path}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ''}</url>`)
  .join('\n')
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`

writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml)
console.log(`sitemap.xml written with ${entries.length} URLs`)
