# 前端基础工作流

## *开箱*

> 首先安装好依赖

package.json 运行脚本
```angular2
  "scripts": {
    "mock-adminTemplate": "vue-cli-service serve --adminTemplate mock",
    "local-adminTemplate": "vue-cli-service serve --adminTemplate local",
    "local-mobileTemplate": "vue-cli-service serve --mobileTemplate local"
  }
```
--adminTemplate mock 这两个参数为 项目名 运行环境 
> 例： npm run mock-adminTemplate

默认的webpack配置中 @ === src
参考代码：
```
  chainWebpack: config => {
    files.forEach(n => {
      config.resolve.alias.set(`@${n}`, resolve(`./src/pages/${n}`))
    })
  }
```
@项目名 可以访问到项目资源


## *添加项目方法*
在./src/pages新建对于项目即可，参考已经建好的两个项目
