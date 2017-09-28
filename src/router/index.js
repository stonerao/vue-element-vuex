import Vue from 'vue'
import Router from 'vue-router'
import index from '@/view/index'
import Layout from '@/view/layout/Layout'
//admin 首页
import Index from '@/view/index/index'
//teacher index
import studentIndex from '@/view/index/student'
//student index 
import teacherIndex from '@/view/index/teacher'

// 学生 
import Authority from '@/view/authority/index'
import shopingVal from '@/view/teaching/shoping'
import teachingData from '@/view/teaching/data'
import { router_l } from './router_l'
import { router_z } from './router_z'
import { constList } from '@/router/Authority'
import { ListStundent } from '@/router/Authority'
import { ListTeacher } from '@/router/Authority'
import { isClassLogin } from '@/utils/auth'
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
// 学校管理 模块组件
export const constListMap = constList;
// 分权限 
export function constListFun() {
  let arr = [];
  const lginState = isClassLogin();
  if (typeof lginState == 'undefined') {
    window.location.href = "./#/admin"
    return
  }
  return lginState == 1 ? constListMap : (lginState == 2 ? ListTeacher : ListStundent);
}
// 登录
import login from '@/view/login/login'
import adminLogin from '@/view/login/admin'

import good_exam from '@/view/examination/good_exam'
import pwdset from '@/view/login/setpwd'
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
    path: '/students',
    name: '管理中心',
    redirect: '/students/index',
    icon: pmsd,
    iconActive: pmsd_active,
    component: Layout,
    children: [
      {
        path: 'index',
        name: '-学生管理中心',
        component: studentIndex,
      }
    ]
  },
  {
    path: '/teacherindex',
    name: '管理中心',
    redirect: '/teacherindex/index',
    icon: pmsd,
    iconActive: pmsd_active,
    component: Layout,
    children: [
      {
        path: 'index',
        name: '-老师管理',
        component: teacherIndex,
      }
    ]
  },
  {
    path: '/login',
    name: '-登录中心',
    component: login
  },
  {
    path: '/admin',
    name: '-管理员登录',
    component: adminLogin
  },
  {
    path: '/',
    redirect: "/one/index"
  },
  {
    path: '/shoping',
    name: '-教材购买',
    component: shopingVal
  },
  {
    path: '/teachingData',
    name: '-相关资料',
    component: teachingData
  },
  {
    path: '/good_exam',
    name: '-考试',
    component: good_exam
  },
  {
    path: '/setPwd',
    name: '-考试',
    component: pwdset
  }
]

export default new Router({
  routes: [
    ...constListMap,
    ...constRouterMap,
    ...router_l,
    ...router_z,
    ...ListStundent,
    ...ListTeacher,
  ],
  linkActiveClass: 'active',
  // mode: 'history',
})
