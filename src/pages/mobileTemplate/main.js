import Vue from 'vue'
import App from './App.vue'
import router from './router'

// vuex
import store from './store'

// vuetify全家桶
import vuetify from './vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
Vue.use(store)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
