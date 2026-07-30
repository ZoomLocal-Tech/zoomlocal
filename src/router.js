export const routes = [
  { path: '/', name: 'home', component: () => import('./pages/Home.vue') },
  { path: '/pricing', name: 'pricing', component: () => import('./pages/Pricing.vue') },
  { path: '/tools', name: 'tools', component: () => import('./pages/Tools.vue') },
  { path: '/tools/:slug', name: 'tool', component: () => import('./pages/ToolPage.vue') },
  { path: '/blog', name: 'blog', component: () => import('./pages/Blog.vue') },
  { path: '/blog/:slug', name: 'blog-post', component: () => import('./pages/BlogPost.vue') },
  // Client-side fallback for unknown paths. Direct hits on unknown URLs are
  // served by Firebase Hosting as public/404.html with a real 404 status.
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('./pages/NotFound.vue') },
]
