<template>
  <div class="flex">
    <div style="width: 300px;margin-right: 20px" v-loading="loading">
      <el-card shadow="hover">
        <el-tree
          :data="Deps"
          node-key="id"
          ref="tree"
          highlight-current
          @node-click="check"
          :props="defaultProps">
        </el-tree>
      </el-card>
    </div>
    <div class="flex1">
      <el-card shadow="hover">
        鼠标悬浮时显示
      </el-card>
    </div>
  </div>
</template>

<script>
import { useForm } from '../useForm'
import { reactive, getCurrentInstance } from '@vue/composition-api'
export default {
  setup () {
    const xtc = getCurrentInstance()
    const { Deps, getDep, loading } = useForm()
    getDep()

    function check () {
      console.log('xtc.$refs.tree.getCurrentKey()', xtc.$refs.tree.getCurrentKey())
    }
    // 部门树规则
    const defaultProps = reactive({
      children: 'children',
      label: 'label'
    })
    return {
      Deps,
      getDep,
      loading,
      defaultProps,
      check
    }
  }
}
</script>

<style scoped>
  ::v-deep .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content{
    border-bottom: 2px solid #409EFF;
  }
</style>
