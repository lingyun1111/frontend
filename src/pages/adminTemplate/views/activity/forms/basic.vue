<template>
  <el-form :model="Basic" :rules="rules" ref="basic" label-width="100px" class="forms">
    <el-form-item label="活动名称" prop="name">
      <el-input v-model="Basic.name"></el-input>
    </el-form-item>
    <el-form-item label="活动时间" required>
      <el-form-item prop="date">
        <el-date-picker
          v-model="Basic.date"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 100%"
        >
        </el-date-picker>
      </el-form-item>
    </el-form-item>
    <el-form-item label="表单描述" prop="desc">
      <el-input type="textarea" v-model="Basic.desc"></el-input>
    </el-form-item>
    <el-form-item label="填报机构" prop="core" v-loading="loading" required>
      <el-tree
        :data="Cores"
        show-checkbox
        node-key="id"
        ref="tree"
        :default-checked-keys="Basic.core"
        highlight-current
        @check="check"
        :props="defaultProps">
      </el-tree>
    </el-form-item>
  </el-form>
</template>

<script>
import validate from '@/utils/elementValidate/index.js'
import { useForm } from './useForm'
import { reactive, getCurrentInstance, watch } from '@vue/composition-api'
export default {
  setup () {
    const ctx = getCurrentInstance()
    const { Basic, getCore, loading, Cores } = useForm()
    // 表单校验
    const rules = reactive({
      name: [
        { required: true, message: '请输入活动名称', trigger: 'blur' }
      ],
      date: [
        { required: true, message: '请选择活动时间', trigger: 'change' }
      ],
      core: [
        { validator: validate.add, type: 'emptyArr', msg: '填报机构', trigger: 'change' }
      ]
    })
    // 时间快捷选择
    const pickerOptions = reactive({
      disabledDate (time) {
        return time ? time.getTime() + (3600 * 1000 * 24) <= Date.now() : false
      },
      shortcuts: [{
        text: '最近一周',
        onClick (picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          picker.$emit('pick', [start, end])
        }
      }, {
        text: '最近一个月',
        onClick (picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          picker.$emit('pick', [start, end])
        }
      }, {
        text: '最近三个月',
        onClick (picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          picker.$emit('pick', [start, end])
        }
      }]
    })
    // 机构树规则
    const defaultProps = reactive({
      children: 'children',
      label: 'label'
    })
    function check () {
      const keys = ctx.$refs.tree.getCheckedKeys()
      ctx.$store.commit('activity/SET_CORE', keys)
      ctx.$refs.basic.validate('core')
    }
    watch(() => Basic.value.core,
      (value) => {
        ctx.$nextTick(() => {
          ctx.$refs.tree.setCheckedKeys(value)
        })
      },
      {
        deep: true
      }
    )
    getCore()
    return {
      Basic,
      rules,
      pickerOptions,
      defaultProps,
      loading,
      Cores,
      check
    }
  }
}
</script>
