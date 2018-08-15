import Vue from 'vue'
import Router from 'vue-router'
import manage from '@/components/manage'
import home from '@/components/home'
import ownerlist from '@/components/ownerlist'
import arealist from '@/components/arealist'
import explain from '@/components/explain'
import mapshow from '@/components/mapshow'
import ardlist from '@/components/ardlist'
import iotdatalist from '@/components/iotdatalist'
import login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
      {
        path:'/',
        name:'login',
        component:login,
      },
    {
      path: '/manage',
      name: 'manage',
      component: manage,
      children: [{
        path:'',
        name: 'home',
        component: home,
        meta: [],
      },{
        path:'/ownerlist',
        name: 'ownerlist',
        component:ownerlist,
        meta:['数据管理', '用户列表'],
      },{
        path: '/arealist',
        name: 'arealist',
        component: arealist,
        meta: ['数据管理', '区域列表'],
      },{
        path: '/ardlist',
        name: 'ardlist',
        component: ardlist,
        meta: ['数据管理', '节点列表'],
      },{
        path:'/iotdatalist',
        name: 'iotdatalist',
        component:iotdatalist,
        meta:['数据管理', '节点数据'],
      },{
        path:'/explain',
        name: 'explain',
        component:explain,
        meta:['说明', '说明'],
      },{
        path:'/mapshow',
        name:'mapshow',
        component:mapshow,
        meta:['节点分布'],
      }]
    }
  ],
  mode:'history',
})
