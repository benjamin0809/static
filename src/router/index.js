import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App.vue'
import Product from '../views/atom-product/index.vue'
import AtomStore from '../views/atom-product/atom-store.vue'
import Package from '../views/atom-product/product-package.vue'
import PendingPackage from '../views/atom-product/pending-package.vue'
import ProductList from '../views/atom-product/product-package.vue'
import ProductQuery from '../views/atom-product/product-query.vue'
import Dialog from '../components/ai-dialog.vue'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    component: Product,
  },
  {
    path: '/products', // 产品列表首页
    component: Product,
  },
  {
    path: '/store', // 原子货架
    component: AtomStore,
  },
  {
    path: '/package', // 产品封装
    component: Package,
  },
  {
    path: '/pending-package', // 待封装清单
    component: PendingPackage,
  },
  {
    path: '/product-list', // 产品清单
    component: ProductList,
  },
  {
    path: '/product-query', // 产品目录查询
    component: ProductQuery,
  },
  {
    path: '/dialog', // 产品目录查询
    component: Dialog,
  },
]
export default new VueRouter({
  mode: 'hash',
  routes
})