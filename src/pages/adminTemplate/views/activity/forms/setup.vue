<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="forms">
    <el-col :span="8">
      <el-form-item prop="isVerify"  label="需要数据管理员/班主任审核"  label-width="190px">
        <el-switch v-model="ruleForm.value"></el-switch>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item prop="isVerify"  label="数据管理员/班主任可否增加填报人" label-width="250px">
        <el-switch v-model="ruleForm.value"></el-switch>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item prop="isPublish"  label="立即发布" label-width="150px">
        <el-switch v-model="ruleForm.value"></el-switch>
      </el-form-item>
    </el-col>

    <el-card shadow="hover" :body-style="{paddingBottom: '0' }">
      <el-form-item label="职工填报设定" prop="delivery">
        <el-switch v-model="ruleForm.delivery"></el-switch>
      </el-form-item>

      <template v-if="ruleForm.delivery">
        <el-form-item label="填报人选定" prop="type">
          <el-checkbox-group v-model="ruleForm.type">
            <el-checkbox v-for="item in cities" :label="item.id" :key="item.id">{{item.lable}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="数据管理员代填（职工不可见）" prop="delivery" label-width="215px">
          <el-switch v-model="ruleForm.delivery"></el-switch>
        </el-form-item>
      </template>
    </el-card>

    <el-card shadow="hover" :body-style="{paddingBottom: '0' }" style="margin-top: 20px">
      <el-form-item label="学生数据填报设定开关" prop="delivery"  label-width="160px">
        <el-switch v-model="ruleForm.delivery"></el-switch>
      </el-form-item>

      <template v-if="ruleForm.delivery">
        <el-form-item label="年级" >
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <el-checkbox-group v-model="ruleForm.checkedCities"  @change="handleCheckedCitiesChange">
            <el-checkbox v-for="item in school" :label="item.id" :key="item.id">{{item.lable}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="数据管理员/班主任代填（家长不可见）" prop="delivery" label-width="265px">
          <el-switch v-model="ruleForm.delivery"></el-switch>
        </el-form-item>
      </template>
    </el-card>

  </el-form>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        value: false,
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        checkedCities: []
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      },
      cities: [
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
      ],
      school: [
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

      ],

      isIndeterminate: null,
      checkAll: false
    }
  },
  methods: {
    handleCheckAllChange (val) {
      this.ruleForm.checkedCities = val ? this.school.map(n => { return n.id }) : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.school.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.school.length
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
