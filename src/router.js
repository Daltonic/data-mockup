import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('./views/Projects.vue'),
      name: 'projects',
      meta: { requireAuth: true }
    },
    {
      path: '/login',
      component: () => import('./views/Login.vue'),
      name: 'login',
      meta: { requireAuth: true }
    },
  ],
  mode: 'history'
})
