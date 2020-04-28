
const login = {
  state: {
    title: '三真互联网医院综合服务管理平台', // 系统名字
    user: JSON.parse(sessionStorage.getItem('user')) || null,
    isCollapse: false, // nav是否收起
    newrouter: [] // 路由
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user
    }
  },
  actions: {
    // 登录
    Logins ({ commit }, info) {
      return new Promise((resolve, reject) => {
        commit('SET_USER', info)
        resolve(info)
      }).catch(error => {
        reject(error)
      })
    }
  }
}
export default login
