import Vue from 'vue'
import Router from 'vue-router'
// import firebase from 'firebase'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "Projects" */ './views/Projects.vue'),
    name: 'projects'
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "Login" */ './views/Login.vue'),
    name: 'login',
  },
  {
    path: '/signup',
    component: () => import(/* webpackChunkName: "Register" */ './views/Register.vue'),
    name: 'signup',
  },
  {
    path: '/mockups',
    component: () => import(/* webpackChunkName: "Mockup" */ './views/MockUps.vue'),
    name: 'mockups',
    meta: { requiresAuth: true }
  },
  {
    path: '/projects/:id',
    component: () => import(/* webpackChunkName: "Project" */ './views/Project.vue'),
    name: 'project',
    meta: { requiresAuth: true }
  },
]

const router = new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes
})

export default router;