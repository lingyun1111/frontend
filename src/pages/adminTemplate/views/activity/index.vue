<template>
  <div class="app-container">
<!--    筛选-->
    <search>
      <el-button type="primary"  @click="$refs.dialog1.dialogVisible = true" class="el-icon-plus"> 新建(步骤条模式)</el-button>
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
        <template v-slot>
          <el-dropdown @command="(value)=>handleCommand(value,'dialog2')">
            <div class="el-dropdown-link">
              浏览<i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="basic">基本信息</el-dropdown-item>
              <el-dropdown-item command="setup">填报设置</el-dropdown-item>
              <el-dropdown-item command="subject">题目列表</el-dropdown-item>
              <el-dropdown-item divided command="basic,setup,subject">所有</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-dropdown @command="(value)=>handleCommand(value,'dialog3')">
            <div class="el-dropdown-link">
              编辑<i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="basic">基本信息</el-dropdown-item>
              <el-dropdown-item command="setup">填报设置</el-dropdown-item>
              <el-dropdown-item command="subject">题目列表</el-dropdown-item>
              <el-dropdown-item divided command="basic,setup,subject">所有</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
<!--    翻页-->
    <Pagination :table="table" @change="tablelist"></Pagination>
<!--    新建-->
    <dialog-model ref="dialog1" title="新建活动" :fullscreen="true" :destroy="true">
      <forms ref="forms" @close="$refs.dialog1.dialogVisible=false"></forms>
    </dialog-model>

    <!--    浏览-->
    <dialog-model ref="dialog2" title="预览" :width="`900px`" top="5vh">
      <div style="max-height: 65vh;overflow: auto">
        <basic ref="basic" v-if="showComponent.includes('basic')"></basic>
        <setup ref="setup" v-if="showComponent.includes('setup')"></setup>
        <subject ref="subject" v-if="showComponent.includes('subject')"></subject>
      </div>
      <div style="margin-top: 20px;text-align: right">
        <el-button type="primary" @click="$refs.dialog2.dialogVisible = false">确认</el-button>
      </div>
    </dialog-model>

    <!--    编辑-->
    <dialog-model ref="dialog3" title="编辑" :width="`900px`" top="5vh">
      <div style="max-height: 65vh;overflow: auto">
        <basic ref="basic" v-if="showComponent.includes('basic')"></basic>
        <setup ref="setup" v-if="showComponent.includes('setup')"></setup>
        <subject ref="subject" v-if="showComponent.includes('subject')"></subject>
      </div>
      <div style="margin-top: 20px;text-align: right">
        <el-button @click="$refs.dialog3.dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="edit">确认</el-button>
      </div>
    </dialog-model>

  </div>
</template>

<script>
import Pagination from '@/components/element/Pagination'
import DialogModel from '@/components/element/DialogModel'
import Search from './search'
import Forms from './forms'

import basic from './forms/basic'
import setup from './forms/setup'
import subject from './forms/subject'

import { useTable } from './useTable'
import { ref, getCurrentInstance } from '@vue/composition-api'
export default {
  setup () {
    const ctx = getCurrentInstance()
    const { tablelist, table } = useTable()
    const showComponent = ref('')
    tablelist()

    // 预览/编辑打开窗口
    function handleCommand (val, ref) {
      showComponent.value = val
      ctx.$refs[ref].dialogVisible = true
      if (ref === 'dialog3') {
        this.$nextTick(() => {
          ctx.$store.commit('activity/RESET_FORMS')
          const arr = showComponent.value.split(',')
          arr.forEach(n => {
            ctx.$refs[n].$refs[n].resetFields()
          })
        })
      }
    }
    // 编辑
    function edit () {
      let arr = showComponent.value.split(',')
      arr = arr.map(n => {
        const item = ctx.$refs[n].$refs[n]
        return item.validate()
      })
      Promise.all(arr).then(res => {
        alert('校验通过')
        console.log('res', res)
      }).catch(err => {
        console.log('err', err)
      })
    }

    return {
      table,
      tablelist,
      handleCommand,
      showComponent,
      edit
    }
  },
  components: {
    Pagination,
    Search,
    DialogModel,
    Forms,
    basic,
    setup,
    subject
  }
}
</script>

<style scoped lang="scss">
  ::v-deep .el-dropdown-link{
    color: #409EFF;
    font-size: 12px;
    margin-right: 5px;
    cursor: pointer;
    i{
      margin-left: 0;
      font-size: 12px;
    }
  }
</style>
