import Vue from 'vue'
import App from './App.vue'
import router from './router'

// vuex
import store from './store'
// element
import Element from 'element-ui'
import './element-variables.scss'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import '@adminTemplate/styles/index.scss' // global css
import '@adminTemplate/permission' // 权限控制

Vue.use(store)
Vue.use(Element) // permission control

if (process.env.NODE_ENV === 'development') {
  const { mockXHR } = require('@/mock')
  mockXHR()
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
