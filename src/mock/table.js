import Mock from 'mockjs'
export default [
  {
    url: '/gettablelist',
    type: 'post',
    response: config => {
      console.log('config', config)
      return Mock.mock({
        code: 200,
        data: {
          'list|10': [{
            avatar: Mock.Random.image('200x100'),
            token: '9527',
            'id|+1': 1,
            name: '@cname',
            'age|18-28': 25,
            'sex|1': ['男', '女'],
            'job|1': ['web', 'UI', 'python', 'php']
          }],
          'total|50-100': 80
        }
      })
    }
  }
]
