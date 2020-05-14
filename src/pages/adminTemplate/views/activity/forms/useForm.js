import { computed, getCurrentInstance, ref } from '@vue/composition-api'
export const useForm = () => {
  const ctx = getCurrentInstance()

  const loading = ref(false)

  // 基础信息
  const Basic = computed(() => ctx.$store.state.activity.forms.basic)
  // 填报设置
  const Setup = computed(() => ctx.$store.state.activity.forms.setup)

  // 机构列表
  const Cores = computed(() => ctx.$store.state.activity.cores)
  // 获取机构列表
  async function getCore () {
    if (Cores.value.length) return false
    loading.value = true
    try {
      await ctx.$store.dispatch('activity/getCore')
    } catch (e) {
      console.log(e)
    }
    loading.value = false
  }

  // 机构列表
  const Deps = computed(() => ctx.$store.state.activity.deps)
  // 获取部门列表
  async function getDep () {
    if (Deps.value.length) return false
    loading.value = true
    try {
      await ctx.$store.dispatch('activity/getDep')
    } catch (e) {
      console.log(e)
    }
    loading.value = false
  }
  return {
    Basic,
    getCore,
    loading,
    Cores,
    Setup,
    getDep,
    Deps
  }
}
