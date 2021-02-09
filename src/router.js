import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('./views/Projects.vue'),
      name: 'projects',
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      component: () => import('./views/Login.vue'),
      name: 'login',
    },
    {
      path: '/signup',
      component: () => import('./views/Register.vue'),
      name: 'signup',
    },
    {
      path: '/mockups',
      component: () => import('./views/MockUps.vue'),
      name: 'mockups',
      meta: { requiresAuth: true }
    },
    {
      path: '/projects/:id',
      component: () => import('./views/Project.vue'),
      name: 'project',
      meta: { requiresAuth: true }
    },
  ],
  mode: 'history'
})
