import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App.vue'
import Home from '../components/Home.vue'
import Table from '../components/Table.vue'
import AppTable from '../components/AppTable.vue'
import codemirror from '../components/codemirror-demo.vue'
import Vxetable from '../components/vxetable.vue'
import Parent from '../views/vue/Parent.vue'

import userRoutes from './user'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    component: App,
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/table',
    component: Table,
  },
  {
    path: '/apptable',
    component: AppTable,
  },
  {
    path: '/codemirror',
    component: codemirror,
  },
  {
    path: '/vue',
    component: Parent,
  },
  {
    path: '/vxe',
    component: Vxetable,
  },
  ...userRoutes,
]
export default new VueRouter({
  mode: 'hash',
  routes
})