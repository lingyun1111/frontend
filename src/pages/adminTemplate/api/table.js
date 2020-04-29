import { POST } from '@/utils/request'

// 获取表格数据
export const tablist = data => {
  return POST('/gettablelist', data)
}
