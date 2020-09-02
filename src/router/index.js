import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('../components/Login')
    },{
      path: '/home ',
      name: 'Home',
      component: () => import('../components/Home'),
      redirect: {name: 'Hello'},
      children: [
        {
          path:'/perprograminfo',
          name:'Perprograminfo',
          component:()=>import('../components/Perprograminfo')
        },
        {
          path:'/frontuser',
          name:'FrontUser',
          component:()=>import('../components/FrontUser')
        },
        {
          path:'/programinfo',
          name:'Programinfo',
          component:()=>import('../components/Programinfo')
        },
        {
          path:'/programtype',
          name:'Programtype',
          component:()=>import('../components/Programtype')
        },
        {
          path: '/personal',
          name: 'Personal',
          component: () => import('../components/Personal')
        },
        {
          path: '/permissionsetting',
          name: 'PermissionSetting',
          component: () => import('../components/PermissionSetting')
        },
        // 嵌套路由，子路由在父路由的组件内部的路由视图中显示
        {
          path: '/backstage_user',
          name: 'BackStage_User',
          component: () => import('../components/BackStage_User')
        }, {
          path: '/empinfo',
          name: 'Empinfo',
          component: () => import('../components/Empinfo')
        }, {
          path: '/departmentinfo',
          name: 'Departmentinfo',
          component: () => import('../components/Departmentinfo')
        }, {
          path: '/topupsetinfo',
          name: 'Topupsetinfo',
          component: () => import('../components/Topupsetinfo')
        }, {
          path: '/hello',
          name: 'Hello',
          component: () => import('../components/HelloWorld')
        },
        //buy充值显示
        {
          path: '/buy',
          name: 'Buy',
          component: () => import('../components/Buy')
        }
      ]
    }
  ],
  mide: 'histroy'
})
