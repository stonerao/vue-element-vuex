import Vue from 'vue'
import Router from 'vue-router'
import index from '@/view/index'
import Layout from '@/view/layout/Layout'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      name: '首页',
      component: Layout,
      children: [
        {
          path: '/index',
          component: Layout,
        } 
      ]
    }
  ]
})
