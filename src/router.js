import { createWebHistory, createRouter } from 'vue-router';
import UserListVue from './components/UserList.vue';
import PostListVue from './components/PostList.vue';
import PostDetailVue from './components/PostDetail.vue';
import NotFoundVue from './components/NotFound.vue';

const routes = [
  {
    path: '/',
    component: UserListVue,
  },
  {
    path: '/user/:userId',
    name: 'user',
    component: PostListVue,
    props: true,
  },
  {
    path: '/user/:userId/post/:id',
    name: 'post',
    component: PostDetailVue,
    props: true,
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
