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
  children 前缀必须加一个标识符
*/
export const constListMap = [
  {
    path: '/index',
    name: '系统设置',
    redirect: '/index/index',
    icon: set,
    iconActive:set,
    component: Layout,
    children: [
      {
        path: 'index', 
        name:'-系统设置',
        component: Index,
      }
    ]
  },
  {
    path: '/set',
    name: '年/班级管理',
    redirect: '/set/index',
    icon: set,
    iconActive:set,
    component: Layout,
    children: [
      {
        path: 'index', 
        name:'-班级管理',
        component: setVue,
      }
    ]
  },{
    path: '/set',
    name: '科目管理',
    redirect: '/set/index',
    icon: set,
    iconActive:set,
    component: Layout,
    children: [
      {
        path: 'index', 
        name:'-科目管理',
        component: setVue,
      }
    ]
  },{
    path: '/set',
    name: '老师管理',
    redirect: '/set/index',
    icon: set,
    iconActive:set,
    component: Layout,
    children: [
      {
        path: 'index', 
        name:'-老师管理',
        component: setVue,
      }
    ]
  },{
    path: '/set',
    name: '学生管理',
    redirect: '/set/index',
    icon: set,
    iconActive:set,
    component: Layout,
    children: [
      {
        path: 'index', 
        name:'-学生管理',
        component: setVue,
      }
    ]
  },{
    path: '/set',
    name: '成绩管理',
    redirect: '/set/index',
    icon: set,
    iconActive:set,
    component: Layout,
    children: [
      {
        path: 'index', 
        name:'-成绩管理',
        component: setVue,
      }
    ]
  },{
    path: '/set',
    name: '考勤管理',
    redirect: '/set/index',
    icon: set,
    iconActive:set,
    component: Layout,
    children: [
      {
        path: 'index', 
        name:'-考勤管理',
        component: setVue,
      }
    ]
  },{
    path: '/set',
    name: '直播管理',
    redirect: '/set/index',
    icon: set,
    iconActive:set,
    component: Layout,
    children: [
      {
        path: 'index', 
        name:'-直播管理',
        component: setVue,
      }
    ]
  },{
    path: '/set',
    name: '视频管理',
    redirect: '/set/index',
    icon: set,
    iconActive:set,
    component: Layout,
    children: [
      {
        path: 'index', 
        name:'-视频管理',
        component: setVue,
      }
    ]
  },{
    path: '/set',
    name: '会议管理',
    redirect: '/set/index',
    icon: set,
    iconActive:set,
    component: Layout,
    children: [
      {
        path: 'index', 
        name:'-会议管理',
        component: setVue,
      }
    ]
  },{
    path: '/set',
    name: '组织架构',
    redirect: '/set/index',
    icon: set,
    iconActive:set,
    component: Layout,
    children: [
      {
        path: 'index', 
        name:'-组织架构',
        component: setVue,
      }
    ]
  },{
    path: '/set',
    name: '权限管理',
    redirect: '/set/index',
    icon: set,
    iconActive:set,
    component: Layout,
    children: [
      {
        path: 'index', 
        name:'-权限管理',
        component: setVue,
      }
    ]
  },{
    path: '/set',
    name: '素材库',
    redirect: '/set/index',
    icon: set,
    iconActive:set,
    component: Layout,
    children: [
      {
        path: 'index', 
        name:'-素材库',
        component: setVue,
      }
    ]
  },{
    path: '/set',
    name: '试题库',
    redirect: '/set/index',
    icon: set,
    iconActive:set,
    component: Layout,
    children: [
      {
        path: 'index', 
        name:'-试题库',
        component: setVue,
      }
    ]
  },{
    path: '/set',
    name: '通知管理',
    redirect: '/set/index',
    icon: set,
    iconActive:set,
    component: Layout,
    children: [
      {
        path: 'index', 
        name:'-通知管理',
        component: setVue,
      }
    ]
  },{
    path: '/set',
    name: '统计信息',
    redirect: '/set/index',
    icon: set,
    iconActive:set,
    component: Layout,
    children: [
      {
        path: 'index', 
        name:'-统计信息',
        component: setVue,
      }
    ]
  },{
    path: '/set',
    name: '锁频设置',
    redirect: '/set/index',
    icon: set,
    iconActive:set,
    component: Layout,
    children: [
      {
        path: 'index', 
        name:'-锁频设置',
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
  ],
  linkActiveClass:'active',
})
