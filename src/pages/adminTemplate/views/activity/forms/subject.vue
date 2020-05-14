<template>
  <el-form :model="ruleForm" :rules="rules" ref="subject" label-width="100px" class="forms">
    <el-form-item label="题目" prop="name">
      <el-input v-model="ruleForm.name" style="width: 200px"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        name: '112'
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
