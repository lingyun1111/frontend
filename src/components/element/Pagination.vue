<template>
  <el-pagination
    class="pagination"
    background
    :layout="layout"
    :total="table.total"
    :current-page="table.pages.page"
    :page-size="table.pages.size"
    :page-sizes="pageSizes"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  >
  </el-pagination>
</template>

<script>
export default {
  props: {
    table: Object,
    layout: {
      type: String,
      default: 'sizes, prev, pager, next, jumper, ->, total, slot'
    },
    pageSizes: {
      type: Array,
      default: () => [5, 10, 20, 30, 40, 50, 100]
    }
  },
  created () {
    console.log('v', this.table)
  },
  methods: {
    handleSizeChange (val) {
      this.table.pages.size = val
      this.$emit('change', this.table.pages)
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.table.pages.page = val
      this.$emit('change', this.table.pages)
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="scss" scoped>
  .pagination{
    text-align: right;
    margin: 10px 0;
  }
</style>
