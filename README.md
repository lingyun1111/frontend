# 前端基础工作流



> 先确保安装好依赖

目前配置里两个项目，adminTemplate和mobileTemplate，分别使用了elementUi、vuetifyjs
## package.json 运行脚本
```angular2
  "scripts": {
    "mock-adminTemplate": "vue-cli-service serve --adminTemplate mock",
    "local-adminTemplate": "vue-cli-service serve --adminTemplate local",
    "local-mobileTemplate": "vue-cli-service serve --mobileTemplate local"
  }
```
--adminTemplate mock 这两个参数为 项目名 运行环境 
> 例： npm run mock-adminTemplate
