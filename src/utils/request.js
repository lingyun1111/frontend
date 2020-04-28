import Axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@adminTemplate/store'
import { getToken } from '@/utils/auth'

/* global AJAXURL */
const service = Axios.create({
  baseURL: AJAXURL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})
service.defaults.headers['Content-Type'] = 'application/json'

service.interceptors.request.use(
  config => {
    // console.log('token', store.getters.token)
    if (store.getters.token) {
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    console.log(response)
    const res = response.data
    if (res.code !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }

      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

// get方法
export const GET = (url = '', params = {}) => {
  return new Promise((resolve, reject) => {
    service.get(url, params).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// POST方法
export const POST = (url = '', param = {}) => {
  return new Promise((resolve, reject) => {
    service.post(url, JSON.stringify(param))
      .then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
  })
}

export default service
