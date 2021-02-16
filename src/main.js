import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import firebase from "firebase"
import firebaseConfig from './firebaseConfig'

firebase.initializeApp(firebaseConfig)

Vue.config.productionTip = false
Vue.use(BootstrapVue)

router.beforeEach((to, from, next) => {
  const authenticatedUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  
  if ( requiresAuth && !authenticatedUser ) {
      console.log("You are not authorized to access this area.");
      next("login");
  }
  else {
      next();
  }
});

let app
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      render: h => h(App),
    }).$mount('#app')
  }
})