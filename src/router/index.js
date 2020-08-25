import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
   {
      path: '/',
      name: 'Login',
      component: ()=>import("../components/Login")
    },{
      path: '/home ',
      name: 'Home',
      redirect:{name:'Hello'},
      component: ()=>import("../components/Home"),
      children:[
        // 嵌套路由，子路由在父路由的组件内部的路由视图中显示
        {
          path:'/backstage_user',
          name:'BackStage_User',
          component: ()=>import("../components/BackStage_User")
        },{
          path: '/hello',
          name: 'Hello',
          component: ()=>import("../components/HelloWorld")
        }
      ]
    }
  ],
  mide: 'histroy'
})
