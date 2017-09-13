import { Message } from 'element-ui'

export default {
  success (message, duration = 3000) {
    Message({
      message: message,
      type: 'success',
      duration: duration,
      showClose: true
    })
  },

  error (message, duration = 3000) {
    Message({
      message: message,
      type: 'error',
      duration: duration,
      showClose: true
    })
  },

  info (message, duration = 3000) {
    Message({
      message: message,
      duration: duration,
      showClose: true
    })
  },

  warning (message, duration = 3000) {
    Message({
      message: message,
      type: 'warning',
      duration: duration,
      showClose: true
    })
  }
}
