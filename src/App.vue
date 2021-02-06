<template>
  <div id="app">
    <MainHeader/>
    <Banner/>
  </div>
</template>

<script>
import MainHeader from './components/MainHeader'
import Banner from './components/Banner'
export default {
  name: 'App',
  components: {
    MainHeader,
    Banner,
  }
}
</script>
<style scoped>
  #app {
    display: block;
  }
</style>