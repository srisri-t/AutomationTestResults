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
    redirect: to => `/r/${to.params.id}`
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

export default router;