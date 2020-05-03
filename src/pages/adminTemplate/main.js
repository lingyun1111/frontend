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
import '@adminTemplate/permission' // permission control

import VueCompositionApi from '@vue/composition-api'

import Toasted from 'vue-toasted'

Vue.use(VueCompositionApi)

Vue.use(store)
Vue.use(Element)
Vue.use(Toasted, {
  position: 'top-center',
  duration: 300000,
  theme: 'toasted-primary',
  iconPack: 'mdi',
  fitToScreen: true,
  type: 'error',
  icon: 'mdi-file-table'
})
/* global envName */
if (envName === 'mock') {
  const { mockXHR } = require('@/mock')
  mockXHR()
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
