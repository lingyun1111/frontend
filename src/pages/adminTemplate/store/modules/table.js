import { tablist, add, edit } from '@adminTemplate/api/table'

const getDefaultState = () => {
  return {
    table: {
      list: [],
      load: false,
      total: 0,
      pages: {
        page: 1,
        size: 10
      },
      search: {}
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
  // 获取列表
  async tablelist ({ commit, state }, value) {
    commit('SET_TABLE', { load: true })
    const res = await tablist({ ...state.table.pages, ...state.table.search })
    const { list, total } = res.data
    commit('SET_TABLE', {
      load: false,
      list,
      total
    })
  },
  // 添加
  async add ({ commit, state }, value) {
    const res = await add(value)
    return Promise.resolve(res)
  },
  // 编辑
  async edit ({ commit, state }, value) {
    const res = await edit(value)
    return Promise.resolve(res)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
