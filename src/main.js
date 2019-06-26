// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import VueLazyload from 'vue-lazyload'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


// Vue.components(Button.name,Button);
// Vue.components(Select.name,Select);
Vue.use(ElementUI);
Vue.use(VueAxios,axios);
Vue.use(Vuex);
Vue.use(VueLazyload,{
  loading:'static/loading-svg/loading-bars.svg',
  try:3
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render:h=>h(App)
})

