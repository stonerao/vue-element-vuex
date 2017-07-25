import Vue from 'vue'
import Router from 'vue-router'
import index from '@/view/index'
import Layout from '@/view/layout/Layout'
import Index from '@/view/index/index'
import setVue from '@/view/set/set'
import { set } from '@/assets/icon'
Vue.use(Router)
/* 
  左侧列表
*/
export const constListMap = [
  {
    path: '/index',
    name: '首页',
    redirect: '/index/index',
    icon: set,
    component: Layout,
    children: [
      {
        path: 'index', 
        component: Index,
      }
    ]
  },
  {
    path: '/set',
    name: '系统设置',
    redirect: '/set/index',
    icon: set,
    component: Layout,
    children: [
      {
        path: 'index', 
        component: setVue,
      }
    ]
  },

]
/* 
  路由配置
*/
export const constRouterMap = [

]

export default new Router({
  routes: [
    ...constListMap,
    {
      path: '/',
      redirect: "index"
    }
  ]
})
