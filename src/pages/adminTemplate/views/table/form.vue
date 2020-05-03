<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
    <el-form-item label="名称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="年龄" prop="age">
      <el-input v-model="ruleForm.age"></el-input>
    </el-form-item>
    <el-form-item label="令牌" prop="token">
      <el-input v-model="ruleForm.token"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-select v-model="ruleForm.sex" placeholder="请选择性别">
        <el-option label="男" value="shanghai"></el-option>
        <el-option label="女" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <slot :form="ruleForm"></slot>
    </el-form-item>
  </el-form>
</template>

<script>
import { reactive, getCurrentInstance } from '@vue/composition-api'
import { useTable } from './useTable'
export default {
  setup () {
    const { tablelist } = useTable()
    const xtc = getCurrentInstance()
    const ruleForm = reactive({
      name: null,
      age: null,
      token: null,
      sex: null
    })
    const rules = reactive({
      name: [
        { required: true, message: '请输入名称', trigger: 'blur' },
        { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
      ],
      sex: [
        { required: true, message: '请选择性别', trigger: 'change' }
      ]
    })
    // 重置
    const resetFields = () => {
      xtc.$refs.ruleForm.resetFields()
    }
    // 添加
    async function add () {
      await xtc.$refs.ruleForm.validate()
      const { data } = await xtc.$store.dispatch('table/add', ruleForm)
      resetFields()
      xtc.$message({
        message: data,
        type: 'success'
      })
    }
    // 编辑
    async function edit () {
      await xtc.$refs.ruleForm.validate()
      const { data } = await xtc.$store.dispatch('table/edit', ruleForm)
      resetFields()
      xtc.$message({
        message: data,
        type: 'success'
      })
    }
    return {
      ruleForm,
      rules,
      resetFields,
      tablelist,
      add,
      edit
    }
  },
  props: ['type']
}
</script>
