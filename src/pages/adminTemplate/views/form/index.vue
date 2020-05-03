<template>
  <div class="app-container">
    <Form ref="addRow">
      <template v-slot="{form}">
        {{form}}
        <el-button type="primary" @click="add" :loading="btnLoading">添加</el-button>
        <el-button type="primary" @click="$refs.addRow.resetFields()">重置</el-button>
      </template>
    </Form>
  </div>
</template>

<script>
import Form from '../table/form'
import { ref, getCurrentInstance } from '@vue/composition-api'
export default {
  setup () {
    const xtc = getCurrentInstance()
    const btnLoading = ref(false)
    async function add () {
      btnLoading.value = true
      try {
        await xtc.$refs.addRow.add()
        xtc.$confirm('添加成功,是否跳转table页面？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          xtc.$router.push('/example/table')
        })
      } catch (e) {
        console.log(e)
      }
      btnLoading.value = false
    }
    return {
      add,
      btnLoading
    }
  },
  components: {
    Form
  }
}
</script>
