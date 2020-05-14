import { POST } from '@/utils/request'

// 获取表格数据
export const getActivityList = data => {
  return POST('/activitylist', data)
}

// 获取机构树
export const getcore = data => {
  return POST('/getcore', data)
}

// 获取部门树
export const getdep = data => {
  return POST('/getdep', data)
}
