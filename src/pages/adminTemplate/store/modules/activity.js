import { getActivityList, getcore } from '@adminTemplate/api/activity'

const getDefaultState = () => {
  return {
    // 表格数据
    table: {
      list: [],
      load: false,
      total: 0,
      pages: {
        page: 1,
        size: 10
      },
      search: {}
    },
    // 活动表单数据
    forms: {
      basic: {
        name: '',
        date: [],
        desc: '',
        core: []
      }
    },
    // 机构数数组
    cores: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TABLE: (state, val) => {
    state.table = { ...state.table, ...val }
  },
  SET_CORES: (state, val) => {
    state.cores = val
  },
  SET_CORE: (state, val = []) => {
    state.forms.basic.core = val
  }
}

const actions = {
  // 获取列表
  async tablelist ({ commit, state }) {
    commit('SET_TABLE', { load: true })
    const res = await getActivityList({ ...state.table.pages, ...state.table.search })
    const { list, total } = res.data
    commit('SET_TABLE', {
      load: false,
      list,
      total
    })
  },
  // 获取机构树
  async getCore ({ commit, state }) {
    const res = await getcore()
    const { data } = res
    commit('SET_CORES', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
