import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Report from '../views/Report.vue';
import UrlService from '../services/UrlService.js';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/r/:id',
    name: 'Report',
    component: Report,
    props: route => ({
      id: UrlService.getLongId(route.params.id)
    })
  },
  {
    path: '/report/:id',
    redirect: to => {
      const shortId = UrlService.generateShortId(to.params.id);
      return `/r/${shortId}`;
    }
  },
  {
    path: '/report',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
});

// Route guard to automatically convert long IDs to short IDs
router.beforeEach((to, from, next) => {
  if (to.name === 'Report' && to.params.id) {
    const currentId = to.params.id;
    
    // If the ID is very long (more than 10 characters), convert it to short ID
    if (currentId.length > 10) {
      const shortId = UrlService.generateShortId(currentId);
      // Redirect to the short URL
      next({ name: 'Report', params: { id: shortId }, replace: true });
      return;
    }
  }
  next();
});

export default router;