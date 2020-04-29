<template>
  <el-pagination
    class="pagination"
    background
    :layout="layout"
    :total="pagination.total"
    :page-sizes="pageSize"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  >
  </el-pagination>
</template>

<script>
export default {
  props: {
    pagination: Object,
    layout: {
      type: String,
      default: 'sizes, prev, pager, next, jumper, ->, total, slot'
    },
    pageSize: {
      type: Array,
      default: () => [5, 10, 20, 30, 40, 50, 100]
    }
  },
  methods: {
    handleSizeChange (val) {
      this.$emit('change', val)
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.$emit('change', val)
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
