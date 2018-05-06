// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import KeenUI from 'keen-ui';
import 'keen-ui/dist/keen-ui.css';

Vue.config.productionTip = false
Vue.use(KeenUI);

new Vue({
  el: '#app',
  router,
  components: { App  },
  template: '<App/>'
})
