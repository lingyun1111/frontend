<template>
  <div class="app-container">
    <el-table
      :data="table.list"
      v-loading="table.load"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
    <Pagination
      :pagination="{
      total:1000
      }"
      @change="tablelist"
    ></Pagination>
  </div>
</template>

<script>
import Pagination from '@/components/element/Pagination'
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      lo: []
    }
  },
  computed: {
    ...mapState('table', ['table'])
  },
  components: {
    Pagination
  },
  created () {
    this.tablelist()
  },
  methods: {
    ...mapActions('table', ['tablelist'])
  }
}
</script>
