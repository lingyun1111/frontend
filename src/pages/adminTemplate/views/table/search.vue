<template>
  <div class="flex">
    <el-form :inline="true" :model="table.search" class="demo-form-inline flex1">
      <el-form-item label="姓名">
        <el-input v-model="search.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="search.region" placeholder="性别">
          <el-option label="男" value="shanghai"></el-option>
          <el-option label="女" value="beijing"></el-option>
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
import { reactive, createComponent } from '@vue/composition-api'
import { useTable } from './useTable'
export default createComponent({
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
})

</script>
