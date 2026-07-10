export const routes = [
  { path: '/', name: 'home', component: () => import('./pages/Home.vue') },
  { path: '/pricing', name: 'pricing', component: () => import('./pages/Pricing.vue') },
  { path: '/tools', name: 'tools', component: () => import('./pages/Tools.vue') },
  { path: '/tools/:slug', name: 'tool', component: () => import('./pages/ToolPage.vue') },
  { path: '/blog', name: 'blog', component: () => import('./pages/Blog.vue') },
  { path: '/blog/:slug', name: 'blog-post', component: () => import('./pages/BlogPost.vue') },
]
