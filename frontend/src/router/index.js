import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import CodyView from '../views/CodyView.vue';

import SignUp from '../views/SignUp.vue';
import AboutView from '../views/AboutView.vue'; // AboutView 추가
import FindCre from '@/views/FindCre.vue';
import EditinfView from '@/views/EditinfView.vue';
import DeleteView from '@/views/DeleteView.vue';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
  {
    path: '/cody',
    name: 'cody',
    component: CodyView,
  },
  {
    component: AboutView, // AboutView 추가
  },
  {
    path: '/findCredentials',
    name: 'FindCredentials',
    component: FindCre,
  },
  {
    path: '/updateProfile',
    name: 'updateProfile',
    component: EditinfView,
  },
  {
    path: '/deleteProfile',
    name: 'deleteProfile',
    component: DeleteView,
  },
  

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;