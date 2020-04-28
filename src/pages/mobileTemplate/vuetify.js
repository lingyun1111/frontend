import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import zhHans from 'vuetify/es5/locale/zh-Hans'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: '#05BAFB',
        secondary: '#424242',
        accent: '#05BAFB',
        error: '#f76260',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#ffbe00'
      }
    }
  },
  lang: {
    locales: { zhHans },
    current: 'zh-Hans'
  },
  icons: {
    iconfont: 'mdi'
  }
})
