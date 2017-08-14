import Vue from 'vue'
import Router from 'vue-router'
import index from '@/view/index'
import Layout from '@/view/layout/Layout'
// 首页
import Index from '@/view/index/index'
// 学生 
import Authority from '@/view/authority/index'
import {router_l} from './router_l'
import {router_z} from './router_z'
import { constList } from '@/router/Authority'
/*
  左侧图标以及点击后的图标
*/
import {
  pmsd, pmsd_active
} from '@/assets/icon'
Vue.use(Router)
/*
  左侧列表
  children 前缀必须加一个标识符
*/
export const constListMap = constList;
// 登录
import login from '@/view/login/login'
import adminLogin from '@/view/login/admin'
/*
  路由配置
*/
export const constRouterMap = [
  {
    path: '/one',
    name: '管理中心',
    redirect: '/one/index',
    icon: pmsd,
    iconActive: pmsd_active,
    component: Layout,
    children: [
      {
        path: 'index',
        name: '-管理中心',
        component: index,
      }
    ]
  },
  {
    path: '/login',
    name: '登录中心',
    component: login
  },
  {
    path: '/admin',
    name: '管理员登录',
    component: adminLogin
  },

]

export default new Router({
  routes: [
    ...constListMap,
    ...constRouterMap,
    ...router_l,
    ...router_z,
    {
      path: '/',
      redirect: "/one/index"
    }
  ],
  linkActiveClass: 'active',
})
