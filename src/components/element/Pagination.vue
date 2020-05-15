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
import { getCurrentInstance, createComponent } from '@vue/composition-api'
export default createComponent({
  setup (props) {
    const ctx = getCurrentInstance()
    const { table } = props
    const handleCurrentChange = (val) => {
      table.pages.page = val
      ctx.$emit('change', table.pages)
    }
    const handleSizeChange = (val) => {
      table.pages.size = val
      ctx.$emit('change', table.pages)
    }
    return {
      handleCurrentChange,
      handleSizeChange
    }
  },
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
  }
})

</script>

<style lang="scss" scoped>
  .pagination{
    text-align: right;
    margin: 10px 0;
  }
</style>
