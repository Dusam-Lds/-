import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import Admin from '@/components/admin/Admin'
import Shopcart from '@/components/admin/shopcart/Shopcart'

Vue.use(Router)

//购物车的子路由,定义的变量不能大写开头
const shopcart = [
  {
    path: 'shopcart',  // 子路由path不加/自动拼接父路由path
    name: 'Shopcart',
    component: Shopcart
  },
]
export default new Router({
  routes: [
    // 后台管理
    {
      path: '/admin',
      name: 'Admin',
      component: Admin, children: [...shopcart]
    },
    // 登陆
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    
  ]
})
