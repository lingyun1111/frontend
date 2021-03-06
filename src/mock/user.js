import Mock from 'mockjs'
export default [
  {
    url: '/login',
    type: 'post',
    response: config => {
      return {
        code: 200,
        data: Mock.mock(
          {
            avatar: Mock.Random.image('200x100'),
            token: '9527',
            'id|+1': 1,
            name: '@cname',
            'ago|18-28': 25,
            'sex|1': ['男', '女'],
            'job|1': ['web', 'UI', 'python', 'php']
          }
        )
      }
    }
  },
  {
    url: '/logout',
    type: 'post',
    response: config => {
      return {
        code: 200,
        data: {}
      }
    }
  }
]
