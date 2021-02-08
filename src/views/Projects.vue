<template>
  <div>
    <Banner />
    <RecentProjects />
  </div>
</template>

<script>
import Banner from "@/components/Banner";
import RecentProjects from "@/components/RecentProjects";
export default {
  name: "projects",
  components: {
    Banner,
    RecentProjects,
  },
};
</script>

<style scoped>
</style>