import { writeFileSync } from 'node:fs'
import { TOOLS } from '../src/data/tools.js'
import { POSTS } from '../src/data/posts.js'

const SITE = 'https://zoomlocal.in'
const staticPaths = ['/', '/pricing', '/tools', '/blog']
const urls = [
  ...staticPaths,
  ...TOOLS.map((t) => `/tools/${t.slug}`),
  ...POSTS.map((p) => `/blog/${p.slug}`),
]

const today = new Date().toISOString().slice(0, 10)
const body = urls
  .map((u) => `  <url><loc>${SITE}${u}</loc><lastmod>${today}</lastmod></url>`)
  .join('\n')
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`

writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml)
console.log(`sitemap.xml written with ${urls.length} URLs`)
