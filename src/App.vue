<template>
  <div id="app">
    <MainHeader/>
    <router-view :key="$route.fullPath" />
    <Footer/>
  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader'
import Footer from '@/components/Footer'
export default {
  name: 'App',
  components: {
    MainHeader,
    Footer,
  }
}
</script>
<style scoped>
  #app {
    display: block;
  }
</style>