import { tablist } from '@adminTemplate/api/table'

const getDefaultState = () => {
  return {
    table: {
      list: [],
      load: false,
      total: 0,
      pages: {
        page: 1,
        size: 10
      }
    }
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TABLE: (state, val) => {
    state.table = { ...state.table, ...val }
  }
}

const actions = {
  async tablelist ({ commit, state }, value) {
    commit('SET_TABLE', { load: true })
    const res = await tablist()
    console.log('res', res)
    const { list, total } = res.data
    commit('SET_TABLE', {
      load: false,
      list,
      total
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
