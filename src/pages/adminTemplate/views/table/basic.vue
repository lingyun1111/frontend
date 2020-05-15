<template>
  <div class="app-container">
    <!--    筛选-->
    <search>
      <el-button type="primary" @click="$refs.dialog1.dialogVisible = true" class="el-icon-plus"> 开弹层1</el-button>
    </search>
    <!--    表格-->
    <el-table
      height="calc(100vh - 210px)"
      :data="table.list"
      stripe
      v-loading="table.load">
      <el-table-column prop="avatar" label="头像" width="130">
        <template v-slot="scope">
          <el-image
            style="width: 100px; height: 50px"
            :src="scope.row.avatar"
            :preview-src-list="[scope.row.avatar]">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="token" label="令牌"></el-table-column>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="名字"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="job" label="工作"></el-table-column>
      <el-table-column label="操作" width="120" fixed="right">
        <template>
          <el-button type="text" size="small" @click="$refs.dialog2.dialogVisible = true">打开弹层2</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--    翻页-->
    <Pagination :table="table" @change="tablelist"></Pagination>
    <!--    弹层1-->
    <dialog-model ref="dialog1" title="弹层1" :width="`900px`">
      <el-button type="success" @click="$refs.dialog2.dialogVisible = true">打开弹层2</el-button>
    </dialog-model>
    <!--    弹层2-->
    <dialog-model ref="dialog2" title="弹层2" :width="`900px`">
      <el-button type="primary" @click="$refs.dialog2.dialogVisible = false">关闭</el-button>
    </dialog-model>

  </div>
</template>

<script>
import Pagination from '@/components/element/Pagination'
import DialogModel from '@/components/element/DialogModel'
import Search from './search'

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
    DialogModel
  }
}
</script>
