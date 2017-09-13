import Vue from 'vue'
import VueResource from 'vue-resource'
import message from '../lib/message'
import store from '../store/index'

Vue.use(VueResource)

const baseUrl = ''

export default {
  // 如需自定义处理错误信息，传入第三个参数handle为true，如需隐藏报错，传入第四个参数silent为true
  get (url, query = null, handle = false, silent = false) {
    return this.ajax({
      url: url,
      method: 'get',
      data: query,
      handle: handle,
      silent: silent
    })
  },
  post (url, params = null, handle = false, silent = false) {
    return this.ajax({
      url: url,
      method: 'post',
      data: params,
      handle: handle,
      silent: silent
    })
  },
  put (url, params = null, handle = false, silent = false) {
    return this.ajax({
      url: url,
      method: 'put',
      data: params,
      handle: handle,
      silent: silent
    })
  },
  delete (url, params = null, handle = false, silent = false) {
    return this.ajax({
      url: url,
      method: 'delete',
      data: params,
      handle: handle,
      silent: silent
    })
  },
  jsonp (url, params = {}, handle = false, silent = false) {
    return this.ajax({
      url: url,
      method: 'jsonp',
      data: params,
      handle: handle,
      silent: silent
    })
  },
  ajax (opts) {
    store.state.loadings.push(1)
    let url = baseUrl + opts.url
    // mock 测试 后删除
    if (opts.url.indexOf('static') !== -1) {
      url = opts.url
    }
    var data = (opts.method === 'get' || opts.method === 'jsonp') ? {params: opts.data} : opts.data
    let error = ''
    return new Promise((resolve, reject) => {
      Vue.http[opts.method](url, data).then(response => {
        store.state.loadings.pop()
        let data = response.data || {}
        let code = data.code || 0
        if (code === 200 || opts.handle) {
          resolve(data)
        } else {
          if (code === 500) {
            message.warning('登录失效')
          } else if (code === 403) {
            error = '403 access denied'
            message.warning('权限不足：' + url)
          } else if (code === 400) {
            error = data.msg || '400 unknown error'
            message.error('接口报错：' + url + ' ' + error)
          } else if (code === 401) {
            error = data.msg
            message.error('操作失败：' + error)
          } else if (data.msg) {
            error = (code || '0') + ' ' + data.msg
            message.error('接口报错：' + url + ' ' + error)
          }
          reject(new Error(error))
        }
      }, response => {
        store.state.loadings.pop()
        let type = '接口报错'
        error = url + ' ' + (response.status || 0) + ' ' + (response.statusText || '出现未知问题')
        switch (response.status) {
          case 0:
            type = '网络炸了'
            error = '请稍后重试'
            break
          case 502:
          case 503:
            type = '系统重启'
            error = '请稍后重试'
            break
          case 504:
            type = '请求超时'
            error = '请稍后重试'
            break
        }
        if (!opts.silent) {
          message.error(type + '：' + error)
        }
        reject(new Error(error))
      }).catch(error => {
        store.state.loadings.pop()
        console.warn(error)
      })
    })
  }
}
