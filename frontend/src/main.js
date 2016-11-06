import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css';

import Vue from 'vue';
import App from './App.vue';

import router from './router';
import { DeleteBtn } from './components';

Vue.component('delete-btn', DeleteBtn);

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});

