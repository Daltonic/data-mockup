<template>
  <b-container id="recentProject">
    <h4 class="lead my-5">RECENT PROJECTS</h4>
    <b-row>
      <b-col cols lg="4" md="6" xs="12">
        <b-card class="project__card shadow-lg p-3 mb-5 bg-white rounded border-0">
          <b-card-text class="project__text"> ADD PROJECT </b-card-text>
        </b-card>
      </b-col>

      <b-col v-for="n in 5" :key="n" cols lg="4" md="6" xs="12">
        <b-card class="project__card shadow-lg p-3 mb-5 rounded border-0">
          <b-card-text class="project__text"> LOREM IPSUM DALUM PEREZ EKWA #{{n}} </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {};
</script>

<style scoped>
#recentProject{
    margin-top: -120px;
}
.project__card {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 250px;
    transition: transform .45s;
}

.project__card:hover {
  transform: scale(1.08);
}
</style>