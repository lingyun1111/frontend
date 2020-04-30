<template>
  <div class="app-container">
    <search></search>
    <el-table
      :data="table.list"
      stripe
      v-loading="table.load"
      style="width: 100%">
      <el-table-column prop="avatar" label="头像" width="130">
        <template slot-scope="scope">
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
        <template >
          <el-button type="text" size="small" @click="$refs.dialog1.dialogVisible = true">编辑</el-button>
          <el-button type="text" style="color: red" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :table="this.table" @change="tablelist"></Pagination>
    <dialog-model ref="dialog1">
      <el-button type="text" size="small" @click="$refs.dialog2.dialogVisible = true">编辑</el-button>
    </dialog-model>
    <dialog-model ref="dialog2">
      <h2>1231313</h2>
    </dialog-model>
  </div>
</template>

<script>
import Pagination from '@/components/element/Pagination'
import DialogModel from '@/components/element/DialogModel'
import Search from './search'
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState('table', ['table'])
  },
  components: {
    Pagination,
    Search,
    DialogModel
  },
  created () {
    this.tablelist()
  },
  methods: {
    ...mapMutations('table', ['SET_TABLE']),
    ...mapActions('table', ['tablelist'])
  }
}
</script>
