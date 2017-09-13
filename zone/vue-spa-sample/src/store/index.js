import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)

// 全局状态管理
const state = {
  show: false,
  loadings: []
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})
