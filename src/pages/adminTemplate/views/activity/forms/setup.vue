<template>
  <div>
    <el-form :model="Setup" :rules="rules" ref="setup" label-width="100px" class="forms">
      <el-col :span="8">
        <el-form-item prop="isVerify"  label="需要数据管理员/班主任审核"  label-width="190px">
          <el-switch v-model="Setup.isVerify"></el-switch>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="isAllowModify"  label="数据管理员/班主任可否增加填报人" label-width="250px">
          <el-switch v-model="Setup.isAllowModify"></el-switch>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="isPublish"  label="立即发布" label-width="150px">
          <el-switch v-model="Setup.isPublish"></el-switch>
        </el-form-item>
      </el-col>

      <el-card shadow="hover" :body-style="{paddingBottom: '0' }">
        <el-form-item label="职工填报设定" prop="fill">
          <el-switch v-model="Setup.fill"></el-switch>
        </el-form-item>

        <template v-if="Setup.fill">
          <el-form-item label="填报人选定" prop="fillBy">
            <el-checkbox-group v-model="Setup.fillBy">
              <el-checkbox v-for="item in cities" :label="item.id" :key="item.id">{{item.lable}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="数据管理员代填（职工不可见）" prop="fillReplace" label-width="215px">
            <el-switch v-model="Setup.fillReplace"></el-switch>
          </el-form-item>
        </template>
      </el-card>

      <el-card shadow="hover" :body-style="{paddingBottom: '0' }" style="margin-top: 20px">
        <el-form-item label="学生数据填报设定开关" prop="student"  label-width="160px">
          <el-switch v-model="Setup.student"></el-switch>
        </el-form-item>

        <template v-if="Setup.student">
          <el-form-item label="年级" prop="studentBy">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <el-checkbox-group v-model="Setup.studentBy"  @change="handleCheckedCitiesChange">
              <el-checkbox v-for="item in school" :label="item.id" :key="item.id">{{item.lable}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="数据管理员/班主任代填（家长不可见" prop="studentReplace" label-width="265px">
            <el-switch v-model="Setup.studentReplace"></el-switch>
          </el-form-item>
        </template>
      </el-card>

      <div style="margin-top: 20px">
        <el-button type="primary"  size="small" @click="$refs.dialog1.dialogVisible = true">
          <i class="el-icon-circle-plus-outline"></i> 添加额外填报人员
        </el-button>
        <el-table :data="tableData" border @selection-change="(val)=> multipleSelection = val" style="width: 100%;margin-top: 15px">
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column prop="date" label="日期" width="180"></el-table-column>
          <el-table-column prop="name" label="姓名" width="180"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
          <el-table-column label="操作" width="120" align="center" v-slot="scope">
            <template>
              <el-button type="text" style="color: red" size="small" @click="del([scope.row])">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="danger" size="small" plain style="margin-top:12px" @click="del(multipleSelection)" :disabled="!multipleSelection.length">
          <i class="el-icon-delete"></i> 选中删除
        </el-button>
      </div>

      <div style="margin-top: 40px">
        <el-button type="primary" size="small" @click="$refs.dialog2.dialogVisible = true">
          <i class="el-icon-circle-plus-outline"></i> 添加排除人员
        </el-button>
        <el-table :data="tableData" border @selection-change="(val)=> multipleSelection = val" style="width: 100%;margin-top: 15px">
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column prop="date" label="日期" width="180"></el-table-column>
          <el-table-column prop="name" label="姓名" width="180"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
          <el-table-column label="操作" width="120" align="center" v-slot="scope">
            <template>
              <el-button type="text" style="color: red" size="small" @click="del([scope.row])">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="danger" size="small" plain style="margin-top:12px" @click="del(multipleSelection)" :disabled="!multipleSelection.length">
          <i class="el-icon-delete"></i> 选中删除
        </el-button>
      </div>

    </el-form>

    <dialog-model ref="dialog1" title="添加额外填报人员" :width="`900px`" >
      <DepPerson ref="dialog1Dep"></DepPerson>
    </dialog-model>

    <dialog-model ref="dialog2" title="添加排除人员" :width="`900px`" >
      <DepPerson ref="dialog2Dep"></DepPerson>
    </dialog-model>
  </div>
</template>

<script>
import DialogModel from '@/components/element/DialogModel'
import DepPerson from './com/DepPerson'

import { useForm } from './useForm'
import { reactive, ref, getCurrentInstance } from '@vue/composition-api'
export default {
  setup () {
    const ctx = getCurrentInstance()
    const { Setup } = useForm()
    // 表单校验
    const rules = reactive({
      fillBy: [
        { type: 'array', required: true, message: '请至少选择一个填报人', trigger: 'change' }
      ],
      studentBy: [
        { type: 'array', required: true, message: '请至少选择一个年级', trigger: 'change' }
      ]
    })

    // 填报人设定 数据
    const cities = reactive([
      {
        lable: '全体教职工',
        id: 1
      },
      {
        lable: '家长填报',
        id: 2
      },
      {
        lable: '(校)数据管理员',
        id: 3
      },
      {
        lable: '(校)主数据管理员',
        id: 4
      },
      {
        lable: '班主任',
        id: 5
      },
      {
        lable: '数据管理员代填',
        id: 6
      },
      {
        lable: '职工填报',
        id: 7
      },
      {
        lable: '数据管理员/班主任代填',
        id: 8
      }
    ])
    // 学生数据
    const school = reactive([
      {
        lable: '一年级',
        id: 1
      },
      {
        lable: '二年级',
        id: 2
      },
      {
        lable: '三年级',
        id: 3
      },
      {
        lable: '四年级',
        id: 4
      },
      {
        lable: '五年级',
        id: 5
      },
      {
        lable: '初一年级',
        id: 6
      },
      {
        lable: '初二年级',
        id: 7
      },
      {
        lable: '初三年级',
        id: 8
      },
      {
        lable: '高一年级',
        id: 9
      },
      {
        lable: '高二年级',
        id: 10
      },
      {
        lable: '高三年级',
        id: 11
      }

    ])
    // 年级选择 全选按钮状态
    const isIndeterminate = ref(null)
    const checkAll = ref(false)

    function handleCheckAllChange (val) {
      const keys = val ? school.map(n => { return n.id }) : []
      ctx.$store.commit('activity/SET_STUDENTBY', keys)
      isIndeterminate.value = false
    }
    function handleCheckedCitiesChange (value) {
      const checkedCount = value.length
      checkAll.value = checkedCount === school.length
      isIndeterminate.value = checkedCount > 0 && checkedCount < school.length
    }

    const tableData = reactive([
      {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      },
      {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      },
      {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }
    ])

    const multipleSelection = ref([])
    function del (val) {
      console.log(val)
    }
    return {
      rules,
      cities,
      school,
      isIndeterminate,
      checkAll,
      Setup,
      handleCheckAllChange,
      handleCheckedCitiesChange,
      tableData,
      del,
      multipleSelection
    }
  },
  components: {
    DialogModel,
    DepPerson
  }
}
</script>

<style lang="scss" scoped>
 ::v-deep .el-dialog{
    z-index: 3000;
  }
</style>
