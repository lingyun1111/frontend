import { POST } from '@/utils/request'

// 获取表格数据
export const tablist = data => {
  return POST('/gettablelist', data)
}

// 添加人员
export const add = data => {
  return POST('/add', data)
}

// 编辑人员
export const edit = data => {
  return POST('/edit', data)
}
