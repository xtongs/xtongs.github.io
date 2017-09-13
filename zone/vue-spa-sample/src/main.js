import Vue from 'vue'

import element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import app from './app'
import router from './router'
import store from './store'

Vue.use(element)
Vue.config.productionTip = false

export default new Vue({
  el: '#app',
  template: '<app/>',
  components: { app },
  element,
  router,
  store
})
