<template>
   <header>
     <b-navbar variant="faded" type="light" class="header__shadow">
      <b-navbar-brand to="/">🏆 Data MockUp</b-navbar-brand>

      <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/login">Login</b-nav-item>
        <b-nav-item to="/signin">Sign Up</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
    </b-navbar>
   </header>
</template>

<script>
    export default {
        
    }
</script>
<style scoped>
  .header__shadow {
    box-shadow: 0px 1px 2px 0px rgba(60,64,67,.3), 0px 1px 3px 1px rgba(60,64,67,.15);
  }
</style>