import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'about',
    component: () => import('../views/About.vue')
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/index/index')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index')
  }
]

const router = new VueRouter({
  routes
})

export default router
