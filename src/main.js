import Vue from 'vue'
import './style.css'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router/index'
// require styles
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')