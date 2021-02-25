<template>
  <b-container id="recentProject">
    <h4 class="lead my-5">RECENT PROJECTS</h4>
    <b-row v-if="!requesting">
      <b-col cols lg="4" md="6" xs="12">
        <b-link to="/projects/create" class="project__link text-dark">
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
      <b-col
        v-for="project in projects"
        :key="project.key"
        cols
        lg="4"
        md="6"
        xs="12"
      >
        <div class="project__link text-dark">
          <b-card class="project__card shadow-lg p-3 mb-5 rounded border-0">
            <b-card-body>
              <b-link :to="'/projects/' + project.key">
                <b-card-text class="project__text">{{
                  project.title
                }}</b-card-text>
              </b-link>
              <small class="text-captalize text-muted"
                >Created By: <em>{{ project.creator }}</em></small
              >
              <br />
              <template v-if="currentUser.uid == project.uid">
                <b-button
                  :to="'/projects/edit/' + project.key"
                  size="sm"
                  variant="dark"
                  class="mt-3"
                  >Edit Record</b-button
                >
                <b-button
                  @click="remRow(project)"
                  size="sm"
                  variant="danger"
                  class="ml-2 mt-3"
                  >Delete</b-button
                >
              </template>
            </b-card-body>
          </b-card>
        </div>
      </b-col>
    </b-row>
    <b-row v-else>
      <b-col v-for="n in 5" :key="n" cols lg="4" md="6" xs="12">
        <div class="project__link text-dark">
          <b-card class="project__card shadow-lg p-3 mb-5 rounded border-0">
            <b-card-body>
              <b-skeleton animation="wave" width="55%"></b-skeleton>
              <b-skeleton animation="wave" width="75%"></b-skeleton>
              <div style="display: inline-flex">
                <b-skeleton type="button" class="mr-1"></b-skeleton>
                <b-skeleton type="button"></b-skeleton>
              </div>
            </b-card-body>
          </b-card>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      projects: [],
      requesting: false,
    };
  },
  created() {
    this.getProjects();
  },
  methods: {
    getProjects() {
      this.requesting = true;
      const projectsRef = firebase.database().ref("/projects");
      const projects = [];
      projectsRef.once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const key = childSnapshot.key;
          const data = childSnapshot.val();
          projects.push({ ...data, key });
        });
        this.projects = projects;
        this.requesting = false;
      });
    },
    remRow(project) {
      const projectsRef = firebase.database().ref("/projects");
      projectsRef
        .child(project.key)
        .remove()
        .then(() => {
          const index = this.projects.indexOf(project);
          this.projects.splice(index, 1);
        });
    },
  },
  computed: {
    currentUser() {
      return firebase.auth()?.currentUser || false;
    },
  },
};
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