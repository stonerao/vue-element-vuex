// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import App from './App';
import router from './router';
import store from './store';//vuex
import ElementUI from 'element-ui';//UI框架 element
import 'element-ui/lib/theme-default/index.css';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条 样式
import '@/style/reset.css';//reset css
import 'babel-polyfill';//babel-polyfill
Vue.prototype.$http = axios;
Vue.config.productionTip = false

/* UI */
Vue.use(ElementUI);
const whileList = ['/login','reg'];//白名单
// router 开始加载
router.beforeEach((to,from,next)=>{
  NProgress.start(); // 开启Progress
  next()
})
// router 加载完毕
router.afterEach(() => {
  NProgress.done(); // 结束Progress
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
