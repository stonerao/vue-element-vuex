// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';//UI框架 element
import 'element-ui/lib/theme-default/index.css';
import '@/style/reset.css';//reset css
import '@/style/style.less';//style less
import 'babel-polyfill';//babel-polyfill
import { getToken } from '@/utils/auth';
// 公共js
import '@/utils/start'
// axios 配置
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.transformRequest = [function (data) {
  let ret = ''
  for (let it in data) {
    ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`
  }
  return ret
}]
Vue.prototype.$http = axios;
Vue.config.productionTip = false

/* UI */
Vue.use(ElementUI);
const whileList = ['/login', '/reg', '/admin'];//白名单
// router 开始加载
router.beforeEach((to, from, next) => {
  if (getToken()) { 
    if (to.name) {
      // 如果当前有name
      document.title = to.name.substring(1);
    } else {
      document.title = '康德学堂';
    }
    next()
  } else {
    if (whileList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/admin');
    }
  }
 
})
// router 加载完毕
router.afterEach(() => {
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
