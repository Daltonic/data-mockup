<template>
  <b-container id="recentProject">
    <h4 class="lead my-5">RECENT PROJECTS</h4>
    <b-row>
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

      <b-col v-for="project in projects" :key="project.key" cols lg="4" md="6" xs="12">
        <div class="project__link text-dark">
          <b-card class="project__card shadow-lg p-3 mb-5 rounded border-0">
            <b-card-body>
              <b-link :to="'/projects/' + project.key">
                <b-card-text class="project__text">{{project.title}}</b-card-text>
              </b-link>
              <small class="text-captalize text-muted">Created By: <em>{{project.creator}}</em></small>
              <br>
              <b-button :to="'/projects/edit/' + project.key" size="sm" variant="dark" class="mt-3">Edit Record</b-button>
              <b-button @click="remRow(project)" size="sm" variant="danger" class="ml-2 mt-3">Delete</b-button>
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
      projects: []
    }
  },
  created() {
    this.getProjects()
  },
  methods: {
    getProjects() {
      const projectsRef = firebase.database().ref("/projects");
      const projects = [];
      projectsRef.once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const key = childSnapshot.key;
          const data = childSnapshot.val();
          projects.push({...data, key});
        });
        this.projects = projects;
      });
    },
    remRow(project) {
      const projectsRef = firebase.database().ref("/projects");
      projectsRef
        .child(project.key)
        .remove()
        .then(() => {
          const index = this.projects.indexOf(project)
          this.projects.splice(index, 1)
        })
    },
  }
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