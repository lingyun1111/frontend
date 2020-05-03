import { ref, getCurrentInstance } from '@vue/composition-api'
export const onDialog = () => {
  const ctx = getCurrentInstance()
  const dialogVisible = ref(false)
  const handleClose = (done) => {
    ctx.$confirm('确认关闭？')
      .then(_ => {
        done()
      })
      .catch(_ => {})
  }
  return {
    dialogVisible,
    handleClose
  }
}
