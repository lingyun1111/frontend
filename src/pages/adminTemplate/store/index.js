import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import createPersiste from 'vue-savedata'
Vue.use(Vuex)

const modulesFiles = require.context('./modules', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1').replace('system/', '')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})
console.log('modules', modules)
const persiste = createPersiste({
  ciphertext: true, // 加密存本地, 默认为false
  LS: {
    module: modules.user,
    storePath: 'user' // __storePath:(和Vuex中的option.modules:{key：value}的key,一,一对应)__
  }
})

const store = new Vuex.Store({
  modules,
  getters,
  plugins: [
    persiste
  ]
})

export default store
