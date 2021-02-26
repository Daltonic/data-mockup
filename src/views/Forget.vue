<template>
  <b-row class="m-0">
    <b-col cols lg="5" md="7" sm="8" class="ml-auto mr-auto">
      <b-card class="forget__card shadow-lg rounded border-0">
        <b-card-body class="card-body">
          <p>🚀 Recover your account password</p>
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
            <b-button
              type="submit"
              class="btn btn-block mb-4"
              :disabled="!validated"
              >{{ requesting ? "Sending..." : "Send" }}</b-button
            >
          </b-form>
          <b-card-text>
            Already a member?
            <b-link to="/login" class="text-primary forget__link"
            >Sign In</b-link
          >
          </b-card-text>
          
          <b-card-text>
            Don't have an account?
            <b-link to="/signup" class="text-primary forget__link"
              >Register here</b-link
            >
          </b-card-text>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import firebase from "firebase/app";
import 'firebase/auth';
export default {
  name: "forget",
  data() {
    return {
      form: {
        email: "",
      },
      requesting: false,
    };
  },
  methods: {
    onSubmit() {
      this.requesting = true;
      firebase
        .auth()
        .sendPasswordResetEmail(this.form.email)
        .then(() => this.form.email = '')
        .catch((error) => console.log(error))
        .finally(() => (this.requesting = false));
    },
  },
  computed: {
    validated() {
      return this.form.email.length >= 8;
    },
  },
};
</script>

<style scoped>
.forget__card {
  margin-top: 70px;
}

.forget__card img {
  width: 300px;
}

.forget__link {
  cursor: pointer;
}
</style>