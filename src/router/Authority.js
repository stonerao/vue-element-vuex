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
// 年/班级管理
import gradeVue from '@/view/class/index'
//考情管理
import Attendance from '@/view/attendance/index'
//权限管理
import Authority from '@/view/authority/index'
//我的班级
import myClass from '@/view/myClass/index'
//视频管理
import video from '@/view/video/index'
//直播管理
import videoOnline from '@/view/videoOnline/index'
//素材库(学校)
import materLibrary from '@/view/material/index'
//会议管理(老师)
import conferManage from '@/view/conference/index'

/*
    版权中心
*/
import allOrder from '@/view/order/index'
// 教材中心
import teaching from '@/view/teaching/index'
// 考试中心
import examination from '@/view/examination/index'
// 通知中心
import notice from '@/view/notice/index'
// 考试中心
// 考试管理
import examinationTeacher from '@/view/examination/teacher'
// 老师 试题库
import questions from '@/view/questions/index'
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
// admin
export const constList = [
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
        path: '/grade',
        name: '年/班级管理',
        redirect: '/grade/index',
        icon: bj,
        iconActive: bj_active,
        component: Layout,
        children: [
            {
                path: 'index',
                name: '-班级管理',
                component: gradeVue,
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
        path: '/attendance',
        name: '考勤管理',
        redirect: '/attendance/index',
        icon: sj,
        iconActive: sj_active,
        component: Layout,
        children: [
            {
                path: 'index',
                name: '-考勤管理',
                component: Attendance,
            }
        ]
    }, {
        path: '/videoOnline',
        name: '直播管理',
        redirect: '/videoOnline/index',
        icon: zb,
        iconActive: zb_acitve,
        component: Layout,
        children: [
            {
                path: 'index',
                name: '-直播管理',
                component: videoOnline,
            }
        ]
    }, {
        path: '/video',
        name: '视频管理',
        redirect: '/video/index',
        icon: sp,
        iconActive: sp_active,
        component: Layout,
        children: [
            {
                path: 'index',
                name: '-视频管理',
                component: video,
            }
        ]
    }, {
        path: '/conference',
        name: '会议管理',
        redirect: '/conference/index',
        icon: wdhy,
        iconActive: wdhy_active,
        component: Layout,
        children: [
            {
                path: 'index',
                name: '-会议管理',
                component: conferManage,
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
        path: '/authority',
        name: '权限管理',
        redirect: '/authority/index',
        icon: qx,
        iconActive: qx_active,
        component: Layout,
        children: [
            {
                path: 'index',
                name: '-权限管理',
                component: Authority,
            }
        ]
    }, {
        path: '/material',
        name: '素材库',
        redirect: '/material/index',
        icon: sc,
        iconActive: sc_active,
        component: Layout,
        children: [
            {
                path: 'index',
                name: '-素材库',
                component: materLibrary,
            }
        ]
    }, {
        path: '/questions',
        name: '试题库',
        redirect: '/questions/index',
        icon: st,
        iconActive: st_active,
        component: Layout,
        children: [
            {
                path: 'index',
                name: '-试题库',
                component: questions,
            }
        ]
    }, {
        path: '/notice',
        name: '通知管理',
        redirect: '/notice/index',
        icon: xx,
        iconActive: xx_active,
        component: Layout,
        children: [
            {
                path: 'index',
                name: '-通知管理',
                component: notice,
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
    {
        path: '/adminIndex',
        redirect: "/one/index"
    }

]
// 学生
// 我的作业
import operation from '@/view/operation/myOperation'

export const ListStundent = [
    {
        path: '/operation',
        name: '我的作业',
        redirect: '/operation/index',
        icon: pmsd,
        iconActive: pmsd_active,
        component: Layout,
        children: [
            {
                path: 'index',
                name: '-我的作业',
                component: operation,
            }
        ]
    }, {
        path: '/examination',
        name: '我的考试',
        redirect: '/examination/index',
        icon: pmsd,
        iconActive: pmsd_active,
        component: Layout,
        children: [
            {
                path: 'index',
                name: '-我的考试',
                component: examination,
            }
        ]
    }, {
        path: '/set',
        name: '我的成绩',
        redirect: '/set/index',
        icon: pmsd,
        iconActive: pmsd_active,
        component: Layout,
        children: [
            {
                path: 'index',
                name: '-我的成绩',
                component: setVue,
            }
        ]
    }, {
        path: '/set',
        name: '视频直播',
        redirect: '/set/index',
        icon: pmsd,
        iconActive: pmsd_active,
        component: Layout,
        children: [
            {
                path: 'index',
                name: '-视频直播',
                component: setVue,
            }
        ]
    }, {
        path: '/teaching',
        name: '教材中心',
        redirect: '/teaching/index',
        icon: pmsd,
        iconActive: pmsd_active,
        component: Layout,
        children: [
            {
                path: 'index',
                name: '-教材中心',
                component: teaching,
            }
        ]
    }, {
        path: '/attendance',
        name: '考勤管理',
        redirect: '/attendance/index',
        icon: sj,
        iconActive: sj_active,
        component: Layout,
        children: [
          {
            path: 'index',
            name: '-考勤管理',
            component: Attendance,
          }
        ]
    }, {
        path: '/notice',
        name: '通知管理',
        redirect: '/notice/index',
        icon: pmsd,
        iconActive: pmsd_active,
        component: Layout,
        children: [
            {
                path: 'index',
                name: '-通知管理',
                component: notice,
            }
        ]
    }, {
        path: '/order_al',
        name: '订单管理',
        redirect: '/order_al/index',
        icon: pmsd,
        iconActive: pmsd_active,
        component: Layout,
        children: [
            {
                path: 'index',
                name: '-订单管理',
                component: allOrder,
            }
        ]
    },
    {
        path: '/adminIndex',
        redirect: "/one/index"
    }
]
// 老师
export const ListTeacher = [
    {
        path: '/myClass',
        name: '我的班级',
        redirect: '/myClass/index',
        icon: bj,
        iconActive: bj_active,
        component: Layout,
        children: [
            {
                path: 'index',
                name: '-我的班级',
                component: myClass,
            }
        ]
    }, {
        path: '/set',
        name: '作业管理',
        redirect: '/set/index',
        icon: pmsd,
        iconActive: pmsd_active,
        component: Layout,
        children: [
            {
                path: 'index',
                name: '-作业管理',
                component: setVue,
            }
        ]
    }, {
        path: '/questions',
        name: '试题库',
        redirect: '/questions/index',
        icon: pmsd,
        iconActive: pmsd_active,
        component: Layout,
        children: [
            {
                path: 'index',
                name: '-试题库',
                component: questions,
            }
        ]
    }, {
        path: '/examinationTeacher',
        name: '考试管理',
        redirect: '/examinationTeacher/index',
        icon: pmsd,
        iconActive: pmsd_active,
        component: Layout,
        children: [
            {
                path: 'index',
                name: '-考试管理',
                component: examinationTeacher,
            }
        ]
    }, {
        path: '/set',
        name: '视频直播',
        redirect: '/set/index',
        icon: pmsd,
        iconActive: pmsd_active,
        component: Layout,
        children: [
            {
                path: 'index',
                name: '-视频直播',
                component: setVue,
            }
        ]
    }, {
        path: '/conference',
        name: '会议管理',
        redirect: '/conference/index',
        icon: pmsd,
        iconActive: pmsd_active,
        component: Layout,
        children: [
            {
                path: 'index',
                name: '-会议管理',
                component: conferManage,
            }
        ]
    }, {
        path: '/attendance',
        name: '考勤管理',
        redirect: '/attendance/index',
        icon: sj,
        iconActive: sj_active,
        component: Layout,
        children: [
            {
                path: 'index',
                name: '-考勤管理',
                component: Attendance,
            }
        ]
    }, {
        path: '/material',
        name: '素材库',
        redirect: '/material/index',
        icon: pmsd,
        iconActive: pmsd_active,
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
        name: '通知中心',
        redirect: '/set/index',
        icon: pmsd,
        iconActive: pmsd_active,
        component: Layout,
        children: [
            {
                path: 'index',
                name: '-通知中心',
                component: setVue,
            }
        ]
    }, {
        path: '/teaching',
        name: '教材中心',
        redirect: '/teaching/index',
        icon: pmsd,
        iconActive: pmsd_active,
        component: Layout,
        children: [
            {
                path: 'index',
                name: '-教材中心',
                component: teaching,
            }
        ]
    }, {
      path: '/order_al',
      name: '订单管理',
      redirect: '/order_al/index',
      icon: pmsd,
      iconActive: pmsd_active,
      component: Layout,
      children: [
        {
          path: 'index',
          name: '-订单管理',
          component: allOrder,
        }
      ]
    },

    {
        path: '/adminIndex',
        redirect: "/one/index"
    }
]
//管理员列表模块白名单
export function constListWhile() {
    let arr = [];
    constList.forEach((x) => {
        arr.push(x.redirect);
    })
    return arr;
}
export function constTeacherWhile() {
    let arr = [];
    ListTeacher.forEach((x) => {
        arr.push(x.redirect);
    })
    return arr;
}
export function consStundenWhilet() {
    let arr = [];
    ListStundent.forEach((x) => {
        arr.push(x.redirect);
    })
    return arr;
}
