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
    path: '/forget',
    component: () => import(/* webpackChunkName: "Forget" */ './views/Forget.vue'),
    name: 'forget',
  },
  {
    path: '/mockups',
    component: () => import(/* webpackChunkName: "Mockup" */ './views/MockUps.vue'),
    name: 'mockups',
    meta: { requiresAuth: true }
  },
  {
    path: '/projects/create',
    component: () => import(/* webpackChunkName: "ProjectsCreate" */ './views/ProjectsCreate.vue'),
    name: 'projectsCreate',
    meta: { requiresAuth: true }
  },
  {
    path: '/projects/:id',
    component: () => import(/* webpackChunkName: "Project" */ './views/Project.vue'),
    name: 'project',
    props: true
  },
  {
    path: '/projects/edit/:id',
    component: () => import(/* webpackChunkName: "ProjectsEdit" */ './views/ProjectsEdit.vue'),
    name: 'projectsEdit',
    props: true,
    meta: { requiresAuth: true }
  },
]

const router = new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes
})

export default router;