<template>
  <b-row class="m-0">
    <b-col cols lg="5" md="7" sm="8" class="ml-auto mr-auto">
      <b-card class="login__card shadow-lg rounded border-0">
        <b-card-body class="card-body">
          <p>🚀 Sign into your account</p>
          <b-form @submit.prevent="onSubmit">
            <b-form-group class="form-group">
              <label for="email" class="sr-only">Email</label>
              <b-input
                type="email"
                id="email"
                placeholder="Email address"
                v-model="form.email"
                required
              />
            </b-form-group>
            <b-form-group class="form-group mb-4">
              <label for="password" class="sr-only">Password</label>
              <b-input
                type="password"
                id="password"
                placeholder="***********"
                v-model="form.password"
                required
              />
            </b-form-group>
            <b-button
              type="submit"
              class="btn btn-block mb-4"
              :disabled="!validated"
              >{{ requesting ? "Signing..." : "Login" }}</b-button
            >
          </b-form>
          <b-link to="/forget" class="text-primary login__link"
            >Forgot password?</b-link
          >
          <b-card-text>
            Don't have an account?
            <b-link to="/signup" class="text-primary login__link"
              >Register here</b-link
            >
            Or
            <b-link @click="demoAcc()" class="text-primary login__link"
              >Demo 👈</b-link
            >
          </b-card-text>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import firebase from "firebase";
export default {
  name: "login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      requesting: false,
    };
  },
  methods: {
    demoAcc() {
      this.form.email = 'johndoe@me.com'
      this.form.password = '123456'
    },
    onSubmit() {
      this.requesting = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(() => this.$router.push({ name: "projects" }))
        .catch((error) => console.log(error))
        .finally(() => (this.requesting = false));
    },
  },
  computed: {
    validated() {
      return this.form.email.length >= 8 && this.form.password.length >= 6;
    },
  },
};
</script>

<style scoped>
.login__card {
  margin-top: 70px;
}

.login__card img {
  width: 300px;
}

.login__link {
  cursor: pointer;
}
</style>