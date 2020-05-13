import { computed, getCurrentInstance, ref } from '@vue/composition-api'
export const useForm = () => {
  const ctx = getCurrentInstance()
  const Basic = computed(() => ctx.$store.state.activity.forms.basic)
  const Cores = computed(() => ctx.$store.state.activity.cores)
  const loading = ref(false)

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
  return {
    Basic,
    getCore,
    loading,
    Cores
  }
}
