const webpack = require('webpack')
const fs = require('fs')
const pages = {}
const files = fs.readdirSync('./src/pages')
files.forEach(n => {
  pages[n] = {
    entry: `./src/pages/${n}/main.js`, // page 的入口
    template: './src/public/index.html', // 模板来源
    filename: 'index.html', // 在 dist/index.html 的输出
    favicon: './src/public/favicon.ico',
    title: '首页',
    chunks: ['chunk-vendors', 'chunk-common', n]
  }
})
const env = require('./env')
const page = {}
const projectName = process.argv[3].replace('--', '') // 获取build后面的参数确定执行哪个文件
const envName = process.argv[4] // 环境变量
page[projectName] = pages[projectName]

const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  pages: page,
  publicPath: './',
  outputDir: 'dist' + projectName, // 包名
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin(Object.assign({}, env[envName], {
        projectName: JSON.stringify(projectName),
        envName: JSON.stringify(envName)
      }))
    ]
  },
  chainWebpack: config => {
    files.forEach(n => {
      config.resolve.alias.set(`@${n}`, resolve(`./src/pages/${n}`))
    })
  }
}
