import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'
// import VueCoreImageUpload  from 'vue-core-image-upload'

import moment from 'moment'
import echarts from 'echarts'
Vue.prototype.$moment = moment
Vue.prototype.$echarts = echarts

axios.defaults.baseURL = 'http://127.0.0.1:8066/'
Vue.prototype.$http = axios
// eslint-disable-next-line no-unused-vars
axios.interceptors.request.use(config => {
  // console.log(config)
  config.headers.token = window.sessionStorage.getItem('token')
  // 在最后必须 return config
  return config
})
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
