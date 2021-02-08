<template>
  <b-contianer>
    <b-row class="m-0">
      <b-col cols md="7" class="ml-auto mr-auto">
        <b-card
          img-src="https://cdn.pixabay.com/photo/2017/07/08/11/33/white-2484120_960_720.png"
          img-alt="Card image"
          img-left
          class="login__card shadow-lg rounded border-0"
        >
          <b-card-body class="card-body">
            <p class="login-card-description">Sign into your account</p>
            <b-form action="#!">
              <b-form-group class="form-group">
                <label for="email" class="sr-only">Email</label>
                <b-input
                  type="email"
                  id="email"
                  placeholder="Email address"
                />
              </b-form-group>
              <b-form-group class="form-group mb-4">
                <label for="password" class="sr-only">Password</label>
                <b-input
                  type="password"
                  id="password"
                  placeholder="***********"
                />
              </b-form-group>
              <b-button class="btn btn-block mb-4">Login</b-button>
            </b-form>
            <a to="/forget" class="text-primary login__link">Forgot password?</a>
            <b-card-text>
              Don't have an account?
              <a to="/signup" class="text-primary login__link">Register here</a> 
              Or
              <a to="/signup" class="text-primary login__link">Demo</a>
            </b-card-text>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-contianer>
</template>

<script>
export default {};
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