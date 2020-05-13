export default {
  userName (value) {
    if (!value) {
      return null
    }
    if (value.length < 5) {
      return 'err'
    }
    return false
  },
  userPassword (value) {
    if (!value) {
      return null
    }
    if (value.length < 6) {
      return 'err'
    }
    return false
  },
  // 非空数组
  emptyArr (value = []) {
    if (!value || !value.length) {
      return null
    }
    return true
  }

}

export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
