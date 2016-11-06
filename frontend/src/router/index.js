import Vue from 'vue';
import Router from 'vue-router';
import VueTables from 'vue-tables-2';

Vue.use(Router);
Vue.use(VueTables.client);

import {HomeView, MediaView} from '../views';

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    { path: '/home', component: HomeView },
    { path: '/media', component: MediaView },
    { path: '*', redirect: '/home' }
  ]
});
