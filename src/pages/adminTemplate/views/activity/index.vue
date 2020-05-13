<template>
  <div class="app-container">
<!--    筛选-->
    <search>
      <el-button type="primary" @click="$refs.dialog1.dialogVisible = true" class="el-icon-plus"> 新建</el-button>
    </search>
<!--    表格-->
    <el-table
      height="calc(100vh - 210px)"
      :data="table.list"
      stripe
      v-loading="table.load">
      <el-table-column type="index" width="50" />
      <el-table-column prop="name" label="活动名称" ></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="startTime" label="开始时间"></el-table-column>
      <el-table-column prop="endTime" label="结束时间"></el-table-column>
      <el-table-column prop="status" label="发布状态">
        <template v-slot="scope">
          <el-tag type="success" v-if="scope.row.status">已发布</el-tag>
          <el-tag type="warning" v-else>未发布</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120" fixed="right">
        <template v-slot="scope">
          <el-dropdown>
            <div class="el-dropdown-link">
              浏览<i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>基本信息</el-dropdown-item>
              <el-dropdown-item>填报设置</el-dropdown-item>
              <el-dropdown-item>题目列表</el-dropdown-item>
              <el-dropdown-item divided>所有</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-button type="text" size="small" @click="editRow(scope.row)">编辑</el-button>

        </template>
      </el-table-column>
    </el-table>
<!--    翻页-->
    <Pagination :table="table" @change="tablelist"></Pagination>
<!--    新建-->
    <dialog-model ref="dialog1" title="新建活动" :fullscreen="true" >
      <forms ref="forms" @close="$refs.dialog1.dialogVisible=false"></forms>
    </dialog-model>

  </div>
</template>

<script>
import Pagination from '@/components/element/Pagination'
import DialogModel from '@/components/element/DialogModel'
import Search from './search'
import Forms from './forms'

import { useTable } from './useTable'
export default {
  setup () {
    const { tablelist, table } = useTable()

    tablelist()
    return {
      table,
      tablelist
    }
  },
  components: {
    Pagination,
    Search,
    DialogModel,
    Forms
  }
}
</script>

<style scoped lang="scss">
  ::v-deep .el-dropdown-link{
    color: #409EFF;
    font-size: 14px;
    margin-right: 5px;
    cursor: pointer;
    i{
      margin-left: 0;
      font-size: 12px;
    }
  }
</style>
