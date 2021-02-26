<template>
  <header class="mb-5">
    <b-navbar toggleable="lg" fixed="top" variant="white" type="light" class="header__shadow">
      <b-navbar-brand to="/">🏆 Data MockUp</b-navbar-brand>

      <b-navbar-toggle target="navbar-collapse"></b-navbar-toggle>

      <b-collapse id="navbar-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <template v-if="isLoggedIn">
            <b-nav-item to="/mockups">🎁 Mockup</b-nav-item>
            <b-nav-item @click="logout">🔐 Logout</b-nav-item>
          </template>

          <template v-else>
            <b-nav-item to="/login">🔑 Login</b-nav-item>
            <b-nav-item to="/signup">🔏 Sign Up</b-nav-item>
          </template>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
import firebase from "firebase";
export default {
  name: "mainHeader",
  data() {
    return {
      isLoggedIn: false,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.isLoggedIn = false;
          this.$router.push({name: 'projects'})
        })
        .catch((error) => {
          console.log(error.message);
          this.$router.push({ name: "projects" });
        });
    },
  },
};
</script>
<style scoped>
.header__shadow {
  box-shadow: 0px 1px 2px 0px rgba(60, 64, 67, 0.3),
    0px 1px 3px 1px rgba(60, 64, 67, 0.15);
}
</style>