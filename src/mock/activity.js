import Mock from 'mockjs'
// const Random = Mock.Random // Mock.Random 是一个工具类，用于生成各种随机数据
export default [
  {
    url: '/activitylist',
    type: 'post',
    response: config => {
      console.log('config', config)
      const { body } = config
      return Mock.mock({
        code: 200,
        data: {
          [`list|${body.size + ''}`]: [{
            name: '@ctitle',
            createTime: '@datetime',
            startTime: '@datetime',
            endTime: '@datetime',
            status: '@boolean',
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
    url: '/getcore',
    type: 'post',
    response: config => {
      console.log('config', config)
      return Mock.mock({
        code: 200,
        data: [
          {
            id: 1,
            label: '一级 1',
            children: [{
              id: 4,
              label: '二级 1-1',
              children: [{
                id: 9,
                label: '三级 1-1-1'
              }, {
                id: 10,
                label: '三级 1-1-2'
              }]
            }]
          },
          {
            id: 2,
            label: '一级 2',
            children: [{
              id: 5,
              label: '二级 2-1'
            }, {
              id: 6,
              label: '二级 2-2'
            }]
          },
          {
            id: 3,
            label: '一级 3',
            children: [{
              id: 7,
              label: '二级 3-1'
            }, {
              id: 8,
              label: '二级 3-2'
            }]
          }
        ]
      })
    }
  },
  {
    url: '/getdep',
    type: 'post',
    response: config => {
      console.log('config', config)
      return Mock.mock({
        code: 200,
        data: [
          {
            id: 1,
            label: '一级 1',
            children: [{
              id: 4,
              label: '二级 1-1',
              children: [{
                id: 9,
                label: '三级 1-1-1'
              }, {
                id: 10,
                label: '三级 1-1-2'
              }]
            }]
          },
          {
            id: 2,
            label: '一级 2',
            children: [{
              id: 5,
              label: '二级 2-1'
            }, {
              id: 6,
              label: '二级 2-2'
            }]
          },
          {
            id: 3,
            label: '一级 3',
            children: [{
              id: 7,
              label: '二级 3-1'
            }, {
              id: 8,
              label: '二级 3-2'
            }]
          }
        ]
      })
    }
  }
]
