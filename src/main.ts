/* eslint-disable */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import ItemData from './model/itemData'
import category from './model/cateEnum'

import DataHelper from './store/DataHelper'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');


