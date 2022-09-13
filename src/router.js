import { createWebHistory, createRouter } from 'vue-router';
// import UserVue from './components/User.vue';
import UserDetailVue from './components/UserDetail.vue';
import NotFoundVue from './components/NotFound.vue';

const routes = [
  {
    path: '/',
    components: UserDetailVue,
  },
  {
    path: '/user/:userId',
    components: UserDetailVue,
  },
  {
    path: '/:pathMatch(.*)',
    component: NotFoundVue,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
