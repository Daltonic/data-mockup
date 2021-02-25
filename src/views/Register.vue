<template>
  <b-row class="m-0">
    <b-col cols lg="5" md="7" sm="8" class="ml-auto mr-auto">
      <b-card class="register__card shadow-lg rounded border-0">
        <b-card-body class="card-body">
          <p>🚀 Sign into your account</p>
          <b-form @submit.prevent="onSubmit">
            <b-form-group class="form-group">
              <label for="fullname" class="sr-only">Fullname</label>
              <b-input
                type="text"
                id="fullname"
                placeholder="Fullname"
                v-model="form.fullname"
                required
              />
            </b-form-group>
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
              >{{requesting ? 'Signing...' : 'Sign Up'}}</b-button
            >
          </b-form>
          <b-link to="/forget" class="text-primary register__link"
            >Forgot password?</b-link
          >
          <b-card-text>
            Already a member?
            <b-link to="/login" class="text-primary register__link"
              >SignIn here</b-link
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
  name: "registration",
  data() {
    return {
      form: {
        fullname: "",
        email: "",
        password: "",
      },
      requesting: false,
    };
  },
  methods: {
    onSubmit() {
      this.requesting = true;
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then((res) => {
          return res.user.updateProfile({
            displayName: this.form.fullname,
          });
        })
        .then(() => this.$router.push({name: 'login'}))
        .catch((error) => console.log(error))
        .finally(() => this.requesting = false)
    },
  },
  computed: {
    validated() {
      return (
        this.form.fullname.length >= 6 &&
        this.form.email.length >= 8 &&
        this.form.password.length >= 6
      );
    },
  },
};
</script>

<style scoped>
.register__card {
  margin-top: 70px;
}

.register__card img {
  width: 300px;
}

.register__link {
  cursor: pointer;
}
</style>