// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false;
import 'common/stylus/index.styl'

// 使用axios
Vue.prototype.axios = axios;

//使用lazyLoad
Vue.use(VueLazyload , {
  loading: require('common/image/default.png'),
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
