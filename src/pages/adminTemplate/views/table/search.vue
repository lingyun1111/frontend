<template>
  <div>
    <el-form :inline="true" :model="table.search" class="demo-form-inline">
      <el-form-item label="审批人">
        <el-input v-model="search.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="search.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" class="el-icon-zoom-in"> 查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      search: {
        user: '',
        region: ''
      }
    }
  },
  computed: {
    ...mapState('table', ['table'])
  },
  methods: {
    ...mapMutations('table', ['SET_TABLE']),
    ...mapActions('table', ['tablelist']),
    // 查询
    onSubmit () {
      this.SET_TABLE(JSON.parse(JSON.stringify({ search: this.search })))
      this.tablelist()
    }

  }
}
</script>
