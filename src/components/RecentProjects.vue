<template>
  <b-container id="recentProject">
    <h4 class="lead my-5">RECENT PROJECTS</h4>
    <b-row>
      <b-col cols lg="4" md="6" xs="12">
        <b-link to="/" class="project__link text-dark">
          <b-card
            class="project__card shadow-lg p-3 mb-5 bg-white rounded border-0"
          >
            <b-card-body class="project__add">
              <b-card-text class="project__text">➕</b-card-text>
              <b-card-text class="project__text"> ADD PROJECT </b-card-text>
            </b-card-body>
          </b-card>
        </b-link>
      </b-col>

      <b-col v-for="n in 5" :key="n" cols lg="4" md="6" xs="12">
        <b-link to="/" class="project__link text-dark">
          <b-card class="project__card shadow-lg p-3 mb-5 rounded border-0">
            <b-card-body>
              <b-card-text class="project__text">
                LOREM IPSUM DALUM PEREZ EKWA #{{ n }}
              </b-card-text>
            </b-card-body>
          </b-card>
        </b-link>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {};
</script>

<style scoped>
#recentProject {
  margin-top: -120px;
}
.project__card {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 250px;
  transition: transform 0.45s;
}

.project__card:hover {
  transform: scale(1.08);
}

.project__add {
  text-align: center;
  padding: 50px 0;
}

.project__link {
  text-decoration: none;

}
</style>