import Vue from 'vue';
import Router from 'vue-router';
import VueTables from 'vue-tables-2';

import { HomeView, MediaView, AlarmsView, QuizView } from '../views';

Vue.use(Router);
Vue.use(VueTables.client);

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    { path: '/home', component: HomeView },
    { path: '/media', component: MediaView },
    { path: '/alarms', component: AlarmsView },
    { path: '/quiz', component: QuizView },
    { path: '*', redirect: '/home' },
  ],
});
