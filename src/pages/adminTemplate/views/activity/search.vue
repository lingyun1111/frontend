<template>
  <div class="flex">
    <el-form :inline="true" :model="table.search" class="demo-form-inline flex1">
      <el-form-item label="活动名称">
        <el-input v-model="search.user" placeholder="请输入活动名称"></el-input>
      </el-form-item>
      <el-form-item label="发布状态">
        <el-select v-model="search.region" placeholder="请选择发布状态">
          <el-option label="未发布" value="shanghai"></el-option>
          <el-option label="已发布" value="beijing"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit" class="el-icon-zoom-in"> 查询</el-button>
      </el-form-item>
    </el-form>
    <div style="width: 200px;text-align: right">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/composition-api'
import { useTable } from './useTable'
export default {
  setup () {
    const { tablelist, table, SETTABLE } = useTable()
    const search = reactive({
      user: '',
      region: ''
    })
    const onSubmit = () => {
      SETTABLE(JSON.parse(JSON.stringify({ search: search })))
      tablelist()
    }
    return {
      table,
      tablelist,
      search,
      onSubmit
    }
  }
}

</script>
