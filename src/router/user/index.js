import User from '../../views/user/index.vue'
import Login from '../../views/user/login.vue'
import List from '../../views/user/list.vue'
import Treasury from '../../views/user/treasury.vue'

export const routes = [
  // { path: '/user/:id', component: User, props: true },

  // 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
  {
    path: '/user/:id',
    component: User,
    props: { name: 'Open' }
  },
  {
    path: '/system/login',
    component: Login,
    props: { name: 'Open' }
  },
  {
    path: '/system/table',
    component: List,
    props: { name: 'Open' }
  },
  {
    path: '/system/treasury',
    component: Treasury,
    props: { name: 'Open' }
  }
]
export default routes