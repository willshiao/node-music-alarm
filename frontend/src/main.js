import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import Vue from 'vue';
import App from './App.vue';

import router from './router';
import { DeleteBtn, ToggleEnabledBtn } from './components';

Vue.component('delete-btn', DeleteBtn);
Vue.component('toggle-enabled-btn', ToggleEnabledBtn);

new Vue({
  router,
  el: '#app',
  render: h => h(App),
});
