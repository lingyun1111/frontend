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
  }
}

export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
