import { computed, getCurrentInstance } from '@vue/composition-api'
export const useTable = () => {
  const ctx = getCurrentInstance()
  const table = computed(() => ctx.$store.state.table.table)
  const tablelist = () => {
    ctx.$store.dispatch('table/tablelist')
  }
  const SETTABLE = (value) => {
    ctx.$store.commit('table/SET_TABLE', value)
  }
  return {
    table,
    tablelist,
    SETTABLE
  }
}
