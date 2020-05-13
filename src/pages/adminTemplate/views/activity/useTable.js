import { computed, getCurrentInstance } from '@vue/composition-api'
export const useTable = () => {
  const ctx = getCurrentInstance()
  const table = computed(() => ctx.$store.state.activity.table)
  const tablelist = () => {
    ctx.$store.dispatch('activity/tablelist')
  }
  const SETTABLE = (value) => {
    ctx.$store.commit('activity/SET_TABLE', value)
  }
  return {
    table,
    tablelist,
    SETTABLE
  }
}
