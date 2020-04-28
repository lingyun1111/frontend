const webpack = require('webpack')
const fs = require('fs')
const pages = {}
const files = fs.readdirSync('./src/pages')
console.log('files', files)
files.forEach(n => {
  pages[n] = {
    entry: `./src/pages/${n}/main.js`, // page 的入口
    template: './src/public/index.html', // 模板来源
    filename: 'index.html', // 在 dist/index.html 的输出
    // 当使用 title 选项时，
    // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    favicon: './src/public/favicon.ico',
    title: '首页',
    chunks: ['chunk-vendors', 'chunk-common', n]
  }
})
const page = {}
const projectname = process.argv[3].replace('--', '') // 获取build后面的参数确定执行哪个文件
const configname = process.argv[4] // 环境变量
page[projectname] = pages[projectname]

// 环境变量
const config = {
  local: {
    AJAXURL: "'http://test.cc'",
    APPID: "'wxb20e3398be5e55b5'"
  },
  demo: {
    AJAXURL: "'http://yljk.fylogistics.cn'",
    APPID: "'wxb20e3398be5e55b5'"
  }
}
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  outputDir: 'dist' + projectname, // 包名
  pages: page,
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin(Object.assign({}, config[configname], {
        projectname: JSON.stringify(projectname)
      }))
    ]
  },
  chainWebpack: config => {
    files.forEach(n => {
      config.resolve.alias.set(`@${n}`, resolve(`./src/pages/${n}`))
    })
  }
}
