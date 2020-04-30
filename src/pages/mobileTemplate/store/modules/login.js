
const getDefaultState = () => {
  return {
    token: null,
    userInfo: {},
    test: 'qqqqq'
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  }

}

const actions = {
  // user login
  login ({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
