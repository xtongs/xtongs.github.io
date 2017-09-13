import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/home'
  },
  {
    path: '/home',
    name: '/首页',
    component: require('./pages/home')
  }
]

export default new VueRouter({
  routes
})
