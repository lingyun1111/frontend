<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :width="width"
      :fullscreen="fullscreen"
      :before-close="handleClose">
      <div>
        <slot></slot>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { onDialog } from './onDialog'
export default {
  setup () {
    const { dialogVisible, handleClose } = onDialog()
    return {
      dialogVisible,
      handleClose
    }
  },
  props: {
    title: String,
    width: {
      default: '30%'
    },
    fullscreen: {
      default: false
    }
  }
}
</script>
