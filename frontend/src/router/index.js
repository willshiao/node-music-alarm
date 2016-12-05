import Vue from 'vue';
import Router from 'vue-router';
import VueTables from 'vue-tables-2';

import { HomeView, MediaView, AddMediaView, QuizView,
         AlarmsView, CreateAlarmView } from '../views';

Vue.use(Router);
Vue.use(VueTables.client);

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    { path: '/home', component: HomeView },
    { path: '/media', component: MediaView },
    { path: '/media/new', component: AddMediaView },
    { path: '/alarms', component: AlarmsView },
    { path: '/alarms/new', component: CreateAlarmView },
    { path: '/quiz', component: QuizView },
    { path: '*', redirect: '/home' },
  ],
});
