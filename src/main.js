import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import { post, fetch, patch, put } from './utils/http'
import Highlight from './utils/highlight'
import less from 'less'
import VueLazyload from 'vue-lazyload'

// 定义全局变量

Vue.prototype.$post = post
Vue.prototype.$fetch = fetch
Vue.prototype.$patch = patch
Vue.prototype.$put = put
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(Highlight)
Vue.use(less)
Vue.use(ElementUI)
/* eslint-disable no-new */
Vue.use(VueLazyload, {
  loading: require('./assets/img/loading.gif'), // 加载中图片
  error: require('./assets/img//error_img.jpg') // 加载失败图片
})
new Vue({
  el: '#app',
  router,
  components: { App },
  mounted () {
    // You'll need this for renderAfterDocumentEvent.

    document.dispatchEvent(new Event('render-event'))
  },
  template: '<App/>'
})
