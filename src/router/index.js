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
let router =  new Router({
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
//通过路由守卫进行登陆校验
// router.beforeEach((to,from,next)=>{
//   Vue.prototype.$http.get(Vue.prototype.$api.islogin).then(res=>{
//     let isLogin = false;
//     if(res.data.code=='logined') {
//       isLogin = true;
//     }
//     if(to.name == 'Login') {
//       if(isLogin) {
//         next({name:'Admin'})
//       }else {
//         next();
//       }
//     }
//     if(to.name!='Login') {
//       if(isLogin) {
//         next();
//       }else {
//         next({name:'Login'})
//       }
//     }
//   })
// })

export default router;
// 另一种写法
router.beforeEach((to, from, next) => {
  Vue.prototype.$http.get(Vue.prototype.$api.islogin).then(res => {

    if (to.name == 'Login') {
      if (res.data.code == 'logined') {
        next({ name: 'Admin' })
      } else {
        next();
      }
    }
    if (to.name != 'Login') {
      if (res.data.code == 'logined') {
        next();
      } else {
        //query用来设置url中的查询字符串，我们这里是把用户访问的的的页面通过query记录下来
        //将来用户登陆会自动跳到这个地址
        next({ name: 'Login', query: { next: to.fullPath } });
      }
    }
  })

})