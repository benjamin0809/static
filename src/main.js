import Vue from 'vue'
import './style.css'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCodemirror from 'vue-codemirror'
import router from './router/index'
// require styles
import 'codemirror/lib/codemirror.css'
Vue.use(ElementUI);
Vue.config.ignoredElements = [/^quark-/]
import "quarkd/lib/index"
          // ...

          // // 完整导入 UI 组件库
          // import VxeUI from 'vxe-pc-ui'
          // import 'vxe-pc-ui/lib/style.css'
          // // ...

          // // 完整导入 表格库
          // import VxeUITable from 'vxe-table'
          // import 'vxe-table/lib/style.css'
          // // ...

          // Vue.use(VxeUI)
          // Vue.use(VxeUITable)
          //...
Vue.use(VueCodemirror, /* { 
  options: { theme: 'base16-dark', ... },
  events: ['scroll', ...]
} */)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')