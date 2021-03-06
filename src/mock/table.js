import Mock from 'mockjs'
export default [
  {
    url: '/gettablelist',
    type: 'post',
    response: config => {
      console.log('config', config)
      const { body } = config
      return Mock.mock({
        code: 200,
        data: {
          [`list|${body.size + ''}`]: [{
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
  },
  {
    url: '/add',
    type: 'post',
    response: config => {
      console.log('config', config)
      return Mock.mock({
        code: 200,
        data: '添加成功'
      })
    }
  },
  {
    url: '/edit',
    type: 'post',
    response: config => {
      console.log('config', config)
      return Mock.mock({
        code: 200,
        data: '编辑成功'
      })
    }
  }
]
