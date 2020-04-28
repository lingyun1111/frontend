<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ userInfo.username }}</div>
    {{test}}
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  computed: {
    ...mapState({
      test: state => state.user.test,
      userInfo: state => state.user.userInfo
    })
  },
  mounted () {

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
