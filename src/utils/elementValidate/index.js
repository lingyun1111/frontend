import validate from '@/utils/validate'

const result = (obj) => {
  const { rule, res, callback } = obj
  switch (res) {
    case null:
      callback(new Error(`请输入${rule.msg}`))
      break
    case 'err':
      callback(new Error(`请输入正确的${rule.msg}`))
      break
    default:
      callback()
  }
}

export default {
  add (rule, value, callback) {
    const res = validate[rule.type](value)
    result({ rule, res, callback })
  }
}
