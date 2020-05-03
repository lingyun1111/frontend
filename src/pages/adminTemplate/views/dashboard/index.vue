<template>
  <div class="dashboard-container">
    <div class="dashboard-text">userInfo:</div>
    {{userInfo}}
  </div>
</template>

<script>
import { computed } from '@vue/composition-api'
export default {
  setup (props, { root }) {
    const userInfo = computed(() => root.$store.state.user.userInfo)
    return {
      userInfo
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
