import { POST } from '@/utils/request'
// import request from '@/utils/request'

// 登录
export const login = data => {
  return POST('/login', data)
}

// 退出登录
export const logout = data => {
  return POST('/logout', data)
}

// 取用户信息
export const getInfo = data => {
  return POST('/info', data)
}
//
// export function getInfo (token) {
//   return request({
//     url: '/vue-admin-template/user/info',
//     method: 'get',
//     params: { token }
//   })
// }
//
// export function logout () {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }
