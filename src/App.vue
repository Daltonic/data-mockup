<template>
  <div id="app">
    <MainHeader/>
    <Banner/>
    <RecentProjects/>
    <Footer/>
  </div>
</template>

<script>
import MainHeader from './components/MainHeader'
import Banner from './components/Banner'
import RecentProjects from './components/RecentProjects'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    MainHeader,
    Banner,
    RecentProjects,
    Footer,
  }
}
</script>
<style scoped>
  #app {
    display: block;
  }
</style>