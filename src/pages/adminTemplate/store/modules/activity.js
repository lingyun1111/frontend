import { getActivityList, getcore, getdep } from '@adminTemplate/api/activity'

const getForms = () => {
  return {
    basic: {
      name: '',
      date: [],
      desc: '',
      core: []
    },
    setup: {
      isVerify: false, // 需要数据管理员/班主任审核
      isAllowModify: false, // 数据管理员/班主任可否增加填报人
      isPublish: false, // 立即发布

      fill: false, // 职工填报设定
      fillBy: [], // 填报人设定
      fillReplace: false, // 数据管理员代填（职工不可见）

      student: false, // 学生数据填报设定开关
      studentBy: [], // 学生 年级
      studentReplace: false // 数据管理员/班主任代填（家长不可见）
    }
  }
}
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
    forms: getForms(),
    // 机构列表
    cores: [],
    // 部门列表
    deps: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  RESET_FORMS: (state) => {
    Object.assign(state.forms, getForms())
  },
  SET_TABLE: (state, val) => {
    state.table = { ...state.table, ...val }
  },
  SET_CORES: (state, val) => {
    state.cores = val
  },
  SET_DEPS: (state, val) => {
    state.deps = val
  },
  // 下面是表单内操作
  SET_CORE: (state, val = []) => {
    state.forms.basic.core = val
  },
  SET_STUDENTBY: (state, val = []) => {
    state.forms.setup.studentBy = val
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
  },
  // 获取部门树
  async getDep ({ commit, state }) {
    const res = await getdep()
    const { data } = res
    commit('SET_DEPS', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
