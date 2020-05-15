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
        <template v-slot="scope">
          <el-button type="text" size="small" @click="editRow(scope.row)">编辑</el-button>
          <el-button type="text" style="color: red" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
<!--    翻页-->
    <Pagination :table="table" @change="tablelist"></Pagination>
<!--    新建-->
    <dialog-model ref="dialog1" title="新建" :width="`900px`">
      <Form ref="addRow">
        <template v-slot="{form}">
          {{form}}
          <el-button type="primary" @click="addConfirm" :loading="btnLoading">添加</el-button>
          <el-button type="primary" @click="$refs.addRow.resetFields()">重置</el-button>
          <el-button @click="$refs.dialog1.dialogVisible = false">取 消</el-button>
        </template>
      </Form>
    </dialog-model>
<!--    编辑-->
    <dialog-model ref="dialog2" title="编辑" :width="`900px`">
      <Form ref="editRow">
        <template v-slot="{form}">
          {{form}}
          <el-button type="primary"  @click="editConfirm">编辑</el-button>
          <el-button @click="$refs.dialog2.dialogVisible = false">取 消</el-button>
        </template>
        <template v-slot:item="{form}">
          <el-form-item label="工作(编辑才有)" prop="job">
            <el-input v-model="form.job"></el-input>
          </el-form-item>
        </template>
      </Form>
    </dialog-model>

  </div>
</template>

<script>
import Pagination from '@/components/element/Pagination'
import DialogModel from '@/components/element/DialogModel'
import Search from './search'
import Form from './form'

import { useTable } from './useTable'
import { getCurrentInstance, ref } from '@vue/composition-api'
export default {
  setup () {
    const xtc = getCurrentInstance()
    const { tablelist, table } = useTable()
    const btnLoading = ref(false)

    tablelist()
    const editRow = (row) => {
      xtc.$refs.dialog2.dialogVisible = true
      xtc.$nextTick(() => {
        xtc.$refs.editRow.resetFields()
        xtc.$refs.editRow.ruleForm = Object.assign({}, row)
      })
    }
    // 添加人员
    async function addConfirm () {
      btnLoading.value = true
      try {
        await xtc.$refs.addRow.add()
        xtc.$refs.dialog1.dialogVisible = false
        tablelist()
      } catch (e) {
        console.log(e)
      }
      btnLoading.value = false
    }
    // 编辑人员
    async function editConfirm () {
      btnLoading.value = true
      try {
        await xtc.$refs.editRow.edit()
        xtc.$refs.dialog2.dialogVisible = false
        tablelist()
      } catch (e) {
        console.log(e)
      }
      btnLoading.value = false
    }
    return {
      table,
      tablelist,
      editRow,
      addConfirm,
      editConfirm,
      btnLoading
    }
  },
  components: {
    Pagination,
    Search,
    DialogModel,
    Form
  }
}
</script>
