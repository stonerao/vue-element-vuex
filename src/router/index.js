import Vue from 'vue'
import Router from 'vue-router'
import index from '@/view/index'
import Layout from '@/view/layout/Layout'
// 首页
import Index from '@/view/index/index'
// 学生
import student from '@/view/student/index'
// 老师
import teacher from '@/view/teacher/index'
// 系统设置
import setVue from '@/view/set/set'
// 组织架构
import architecture from '@/view/architecture/index'
// 科目管理
import classVue from '@/view/class/index'
import {router_l} from './router_l'
import {router_z} from './router_z'
/* 
  左侧图标以及点击后的图标
*/
import {
  xtsz, xtsz_active,
  bj, bj_active,
  fykm, fykm_active,
  ls, ls_active,
  xs, xs_active,
  cjd, cjd_active,
  sj, sj_active,
  zb, zb_acitve,
  sp, sp_active,
  zzjg, zzjg_active,
  wdhy, wdhy_active,
  qx, qx_active,
  sc, sc_active,
  st, st_active,
  xx, xx_active,
  tj, tj_active,
  pmsd, pmsd_active
} from '@/assets/icon'
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
    icon: xtsz,
    iconActive: xtsz_active,
    component: Layout,
    children: [
      {
        path: 'index',
        name: '-系统设置',
        component: setVue,
      }
    ]
  },
  {
    path: '/set',
    name: '年/班级管理',
    redirect: '/set/index',
    icon: bj,
    iconActive: bj_active,
    component: Layout,
    children: [
      {
        path: 'index',
        name: '-班级管理',
        component: classVue,
      }
    ]
  }, {
    path: '/class',
    name: '科目管理',
    redirect: '/class/index',
    icon: fykm,
    iconActive: fykm_active,
    component: Layout,
    children: [
      {
        path: 'index',
        name: '-科目管理',
        component: classVue,
      }
    ]
  }, {
    path: '/teacher',
    name: '老师管理',
    redirect: '/teacher/index',
    icon: ls,
    iconActive: ls_active,
    component: Layout,
    children: [
      {
        path: 'index',
        name: '-老师管理',
        component: teacher,
      }
    ]
  }, {
    path: '/student',
    name: '学生管理',
    redirect: '/student/index',
    icon: xs,
    iconActive: xs_active,
    component: Layout,
    children: [
      {
        path: 'index',
        name: '-学生管理',
        component: student,
      }
    ]
  }, {
    path: '/set',
    name: '成绩管理',
    redirect: '/set/index',
    icon: cjd,
    iconActive: cjd_active,
    component: Layout,
    children: [
      {
        path: 'index',
        name: '-成绩管理',
        component: setVue,
      }
    ]
  }, {
    path: '/set',
    name: '考勤管理',
    redirect: '/set/index',
    icon: sj,
    iconActive: sj_active,
    component: Layout,
    children: [
      {
        path: 'index',
        name: '-考勤管理',
        component: setVue,
      }
    ]
  }, {
    path: '/set',
    name: '直播管理',
    redirect: '/set/index',
    icon: zb,
    iconActive: zb_acitve,
    component: Layout,
    children: [
      {
        path: 'index',
        name: '-直播管理',
        component: setVue,
      }
    ]
  }, {
    path: '/set',
    name: '视频管理',
    redirect: '/set/index',
    icon: sp,
    iconActive: sp_active,
    component: Layout,
    children: [
      {
        path: 'index',
        name: '-视频管理',
        component: setVue,
      }
    ]
  }, {
    path: '/set',
    name: '会议管理',
    redirect: '/set/index',
    icon: wdhy,
    iconActive: wdhy_active,
    component: Layout,
    children: [
      {
        path: 'index',
        name: '-会议管理',
        component: setVue,
      }
    ]
  }, {
    path: '/architecture',
    name: '组织架构',
    redirect: '/architecture/index',
    icon: zzjg,
    iconActive: zzjg_active,
    component: Layout,
    children: [
      {
        path: 'index',
        name: '-组织架构',
        component: architecture,
      }
    ]
  }, {
    path: '/set',
    name: '权限管理',
    redirect: '/set/index',
    icon: qx,
    iconActive: qx_active,
    component: Layout,
    children: [
      {
        path: 'index',
        name: '-权限管理',
        component: setVue,
      }
    ]
  }, {
    path: '/set',
    name: '素材库',
    redirect: '/set/index',
    icon: sc,
    iconActive: sc_active,
    component: Layout,
    children: [
      {
        path: 'index',
        name: '-素材库',
        component: setVue,
      }
    ]
  }, {
    path: '/set',
    name: '试题库',
    redirect: '/set/index',
    icon: st,
    iconActive: st_active,
    component: Layout,
    children: [
      {
        path: 'index',
        name: '-试题库',
        component: setVue,
      }
    ]
  }, {
    path: '/set',
    name: '通知管理',
    redirect: '/set/index',
    icon: xx,
    iconActive: xx_active,
    component: Layout,
    children: [
      {
        path: 'index',
        name: '-通知管理',
        component: setVue,
      }
    ]
  }, {
    path: '/set',
    name: '统计信息',
    redirect: '/set/index',
    icon: tj,
    iconActive: tj_active,
    component: Layout,
    children: [
      {
        path: 'index',
        name: '-统计信息',
        component: setVue,
      }
    ]
  }, {
    path: '/set',
    name: '锁频设置',
    redirect: '/set/index',
    icon: pmsd,
    iconActive: pmsd_active,
    component: Layout,
    children: [
      {
        path: 'index',
        name: '-锁频设置',
        component: setVue,
      }
    ]
  },

]
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
