import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import Vue from 'vue';
import VueSweetAlert from 'vue-sweetalert';
import App from './App.vue';

import router from './router';
import { DeleteBtn, StatusCheckbox } from './components';

Vue.component('delete-btn', DeleteBtn);
Vue.component('status-checkbox', StatusCheckbox);

Vue.use(VueSweetAlert);

new Vue({
  router,
  el: '#app',
  render: h => h(App),
});
