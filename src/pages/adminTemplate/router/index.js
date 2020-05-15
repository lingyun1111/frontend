import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../layout'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@adminTemplate/views/dashboard/index'),
      meta: { title: '首页', icon: 'mdi mdi-file-table' }
    }]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: '元素',
    meta: { title: '元素', icon: 'el-icon-eleme' },
    children: [
      {
        path: 'basic',
        name: 'basicTable',
        component: () => import('@adminTemplate/views/table/basic'),
        meta: { title: '基础表格', icon: 'mdi mdi-file-table' }
      },
      {
        path: 'table',
        name: 'Table',
        component: () => import('@adminTemplate/views/table/index'),
        meta: { title: '带form的表格', icon: 'mdi mdi-file-table' }
      },
      {
        path: 'activity',
        name: 'activity',
        component: () => import('@adminTemplate/views/activity/index'),
        meta: { title: '活动管理', icon: 'mdi mdi-file-table' }
      },
      {
        path: 'test',
        name: 'Test',
        // hidden: true,
        component: () => import('@adminTemplate/views/Test'),
        meta: { title: '测试页面', icon: 'mdi mdi-file-table' }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@adminTemplate/views/login/index'),
    hidden: true
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@adminTemplate/views/form/index'),
        meta: { title: '表单', icon: 'mdi mdi-file-table' }
      }
    ]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'mdi mdi-file-table'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@adminTemplate/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1', icon: 'mdi mdi-file-table' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@adminTemplate/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@adminTemplate/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@adminTemplate/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@adminTemplate/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@adminTemplate/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@adminTemplate/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@adminTemplate/views/404'),
    hidden: true
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

export const asyncRoutes = []

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
