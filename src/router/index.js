import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'//登陆
import Admin from '@/components/admin/Admin'
import GoodsComment from '@/components/admin/goods/comment/Comment'//商品评论
import GoodsDetail from '@/components/admin/goods/detail/Detail'//商品详情
import GoodsList from '@/components/admin/goods/list/List'//商品列表

Vue.use(Router)

//购物车的子路由,定义的变量不能大写开头
const goods = [
  {
    path: 'goods/comment',  // 子路由path不加/自动拼接父路由path
    name: 'GoodsComment',
    component: GoodsComment
  },
  {
    path: 'goods/detail/:id',  
    name: 'GoodsDetail',
    component: GoodsDetail
  },
  {
    path: 'goods/list',  
    name: 'GoodsList',
    component: GoodsList
  },
]
export default new Router({
  routes: [
    // 后台管理
    {
      path: '/admin',
      name: 'Admin',
      component: Admin, children: [...goods]
    },
    // 登陆
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    
  ]
})
