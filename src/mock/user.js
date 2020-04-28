import Mock from 'mockjs'
export default [
  {
    url: '/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      return {
        code: 200,
        data: {
          avatar: Mock.Random.image('200x100'),
          token: '9527',
          username: username,
          'id|+1': 1,
          name: '@cname',
          'ago|18-28': 25,
          'sex|1': ['男', '女'],
          'job|1': ['web', 'UI', 'python', 'php']
        }
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
