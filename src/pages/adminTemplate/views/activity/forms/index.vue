<template>
  <div>
    <el-steps :active="active"  align-center finish-status="success">
      <el-step title="基础信息" icon="el-icon-edit"></el-step>
      <el-step title="填报设置" icon="el-icon-s-order"></el-step>
      <el-step title="题目列表" icon="el-icon-s-management"></el-step>
    </el-steps>
    <div style="margin-top: 35px">
      <basic ref="basic" v-if="active===0"></basic>
      <setup ref="setup" v-if="active===1"></setup>
      <subject ref="subject" v-if="active===2"></subject>

      <div style="margin-top: 15px;text-align: center">
        <el-button round @click="active-=1" v-if="active>0">上一步</el-button>
        <el-button type="primary" round @click="next">下一步</el-button>
      </div>
    </div>

  </div>
</template>

<script>
import basic from './basic'
import setup from './setup'
import subject from './subject'

import { useForm } from './useForm'
import { ref, getCurrentInstance } from '@vue/composition-api'
export default {
  setup () {
    const ctx = getCurrentInstance()
    const { Basic, Setup } = useForm()

    // 步骤条
    const active = ref(0)
    // 下一步流程
    async function next () {
      let basic
      let setup
      switch (active.value) {
        case 0:
          try {
            console.log('基础表单数据', Basic)
            basic = ctx.$refs.basic.$refs.basic
            await basic.validate()
            active.value++
          } catch (e) {
            console.log(e)
          }
          break
        case 1:
          try {
            console.log('填报设置数据', Setup)
            setup = ctx.$refs.setup.$refs.setup
            await setup.validate()
            active.value++
          } catch (e) {
            console.log(e)
          }
          break
        case 2:
          ctx.$emit('close')
          break
      }
      // active.value++
    }

    return {
      active,
      next
    }
  },
  components: {
    basic,
    setup,
    subject
  }
}
</script>

<style scoped>

</style>
